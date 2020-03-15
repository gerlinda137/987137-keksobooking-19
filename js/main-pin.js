'use strict';
(function () {
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32
  };

  var MapRect = window.map.RECT;

  var MainPinRect = {
    LEFT: MapRect.LEFT - MainPinSize.RADIUS,
    RIGHT: MapRect.RIGHT - MainPinSize.RADIUS,
    TOP: MapRect.TOP - MainPinSize.HEIGHT,
    BOTTOM: MapRect.BOTTOM - MainPinSize.HEIGHT,
  };

  var mainPin = document.querySelector('.map__pin--main');

  var initialMainPinCoords = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop,
  };


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

    handleChange(getMainPinCoords(MainPinSize.HEIGHT));
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

  var startCoords = null;

  var onMainPinMouseUp = function () {
    startCoords = null;
  };

  var onMainPinStartMove = function (evt) {
    startCoords = {
      y: mainPin.offsetTop - evt.clientY,
      x: mainPin.offsetLeft - evt.clientX,
    };

    mainPin.addEventListener('mouseup', onMainPinMouseUp, {once: true});
  };


  var onMainPinMove = function (evt) {
    var y = startCoords.y + evt.clientY;
    var top = window.util.clampNumber(y, MainPinRect.TOP, MainPinRect.BOTTOM);
    mainPin.style.top = top + 'px';

    var x = startCoords.x + evt.clientX;
    var left = window.util.clampNumber(x, MainPinRect.LEFT, MainPinRect.RIGHT);
    mainPin.style.left = left + 'px';

    handleChange(getMainPinCoords(MainPinSize.HEIGHT));
  };


  var onMainPinMouseDown = window.dnd.makeMouseDownHandler(onMainPinStartMove, onMainPinMove);


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

