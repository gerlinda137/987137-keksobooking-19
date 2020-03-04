'use strict';
(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32
  };

  var mainPin = document.querySelector('.map__pin--main');
  var getMainPinCoords = function (height) {
    return {
      x: mainPin.offsetLeft + MainPinSize.RADIUS,
      y: mainPin.offsetTop + height,
    };
  };

  var onFirstAction = null;
  var onChange = null;

  var setOnFirstAction = function (callback) {
    onFirstAction = callback;
  };

  var setOnChange = function (callback) {
    onChange = callback;
  };

  var handleFirstAction = function () {
    if (window.util.isFunction(onFirstAction)) {
      onFirstAction();
    }

    removeListeners();
  };

  var handleChange = function (coords) {
    if (window.util.isFunction(onChange)) {
      onChange(coords);
    }
  };

  var onMainPinFirstMouseDown = function (evt) {
    if (window.util.isMainMouseButton(evt)) {
      handleFirstAction();
    }
  };

  var onMainPinMouseDown = function (evt) {
    handleChange(getMainPinCoords(MainPinSize.HEIGHT));

    evt.preventDefault();
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top =
      mainPin.offsetTop - shift.y + 'px';
      mainPin.style.left =
      mainPin.offsetLeft - shift.x + 'px';

      handleChange(getMainPinCoords(MainPinSize.HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMainPinFirstKeyDown = function (evt) {
    if (window.util.isEnterKey(evt)) {
      handleFirstAction();
    }
  };

  var addListeners = function () {
    mainPin.addEventListener('mousedown', onMainPinFirstMouseDown);
    mainPin.addEventListener('mousedown', onMainPinMouseDown);
    mainPin.addEventListener('keydown', onMainPinFirstKeyDown);
  };

  var removeListeners = function () {
    mainPin.removeEventListener('mousedown', onMainPinFirstMouseDown);
    mainPin.removeEventListener('keydown', onMainPinFirstMouseDown);
  };

  var reset = function () {
    handleChange(getMainPinCoords(MainPinSize.RADIUS));

    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    addListeners();
  };


  window.mainPin = {
    reset: reset,
    setOnFirstAction: setOnFirstAction,
    setOnChange: setOnChange,
  };
})();

