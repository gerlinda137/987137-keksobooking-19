'use strict';
(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32
  };

  var PinDragArea = {
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

  var onMainPinMouseDown = function () {
    handleChange(getMainPinCoords(MainPinSize.HEIGHT));
  };


  var onStartMove = function () {
    mainPin.addEventListener('click', {once: true});
  };

  var onMove = function (evt) {
    var newMainPinPositionTop = mainPin.offsetTop + evt.movementY;
    if (newMainPinPositionTop >= PinDragArea.MIN_Y && newMainPinPositionTop <= PinDragArea.MAX_Y) {
      mainPin.style.top = newMainPinPositionTop + 'px';
    }
    var newMainPinPositionLeft = mainPin.offsetLeft + evt.movementX;
    if (newMainPinPositionLeft >= PinDragArea.MIN_X - MainPinSize.RADIUS && newMainPinPositionLeft <= PinDragArea.MAX_X - MainPinSize.RADIUS) {
      mainPin.style.left = newMainPinPositionLeft + 'px';
    }

    handleChange(getMainPinCoords(MainPinSize.HEIGHT));
  };

  var onMainPinMouseDownEvent = window.dnd.makeMouseDownHandler(onStartMove, onMove);
  mainPin.addEventListener('mousedown', onMainPinMouseDownEvent);


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

