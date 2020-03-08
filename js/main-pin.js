'use strict';
(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32
  };

  var mainPin = document.querySelector('.map__pin--main');

  var initialMainPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };

  var MapRect = window.map.RECT;

  var resetMainPinPosition = function () {
    mainPin.style.top = initialMainPinCoords.y + 'px';
    mainPin.style.left = initialMainPinCoords.x + 'px';
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


  var onStartMove = function () {
    mainPin.addEventListener('click', {once: true});
  };

  var MainPinRect = {
    LEFT: MapRect.LEFT - MainPinSize.RADIUS,
    RIGHT: MapRect.RIGHT - MainPinSize.RADIUS,
    TOP: MapRect.TOP,
    BOTTOM: MapRect.BOTTOM,
  };

  var onMove = function (evt) {
    var newMainPinPositionTop = mainPin.offsetTop + evt.movementY;
    var top = window.util.clampNumber(newMainPinPositionTop, MainPinRect.TOP, MainPinRect.BOTTOM);
    mainPin.style.top = top + 'px';

    var newMainPinPositionLeft = mainPin.offsetLeft + evt.movementX;
    var left = window.util.clampNumber(newMainPinPositionLeft, MainPinRect.LEFT, MainPinRect.RIGHT);
    mainPin.style.left = left + 'px';

    handleChange(getMainPinCoords(MainPinSize.HEIGHT));
  };

  var onMainPinMouseDown = window.dnd.makeMouseDownHandler(onStartMove, onMove);


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

