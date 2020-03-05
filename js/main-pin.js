'use strict';
(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32
  };

  var PinDraggArea = {
    MIN_X: 0,
    MAX_X: 1200,
    MIN_Y: 130,
    MAX_Y: 630,
  };

  var mainPin = document.querySelector('.map__pin--main');

  var defaultMainPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };
  var resetMainPinPosition = function () {
    mainPin.style.top = defaultMainPinCoords.y + 'px';
    mainPin.style.left = defaultMainPinCoords.x + 'px';
  };

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


    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var newMainPinPositionTop = mainPin.offsetTop + moveEvt.movementY;
      if (newMainPinPositionTop >= PinDraggArea.MIN_Y && newMainPinPositionTop <= PinDraggArea.MAX_Y) {
        mainPin.style.top = newMainPinPositionTop + 'px';
      }
      var newMainPinPositionLeft = mainPin.offsetLeft + moveEvt.movementX;
      if (newMainPinPositionLeft >= PinDraggArea.MIN_X - MainPinSize.RADIUS && newMainPinPositionLeft <= PinDraggArea.MAX_X - MainPinSize.RADIUS) {
        mainPin.style.left = newMainPinPositionLeft + 'px';
      }

      handleChange(getMainPinCoords(MainPinSize.HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', onMouseMoveOnce, {capture: true});
    };

    var onClickPreventDefault = function (clickEvt) {
      clickEvt.preventDefault();
    };

    var onMouseMoveOnce = function () {
      mainPin.addEventListener('click', onClickPreventDefault, {once: true});
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousemove', onMouseMoveOnce, {once: true, capture: true});
    document.addEventListener('mouseup', onMouseUp, {once: true});
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
    resetMainPinPosition();
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

