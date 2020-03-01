'use strict';

(function () {

  var mapPinsContainer = document.querySelector('.map__pins');

  var addPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      var renderedAd = window.renderPin(adverts[i]);
      fragment.appendChild(renderedAd);
    }
    mapPinsContainer.appendChild(fragment);
  };

  var mapPin = document.querySelector('.map__pin--main');

  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32
  };

  var getPinPosition = function () {
    var left = mapPin.offsetLeft;
    var top = mapPin.offsetTop;
    return {left: left, top: top};
  };

  var getPinAddress = function () {
    var pinPos = window.map.getPinPosition();
    return (
      Math.floor(pinPos.left + 0.5 * MainPinSize.WIDTH) +
      ', ' +
      Math.floor(pinPos.top + MainPinSize.HEIGHT)
    );
  };

  var getCenterPinAddress = function () {
    var pinPos = getPinPosition();
    return (
      Math.floor(pinPos.left + MainPinSize.RADIUS) +
      ', ' +
      Math.floor(pinPos.top + MainPinSize.RADIUS)
    );
  };

  window.map = {
    addPins: addPins,
    MainPinSize: MainPinSize,
    getPinPosition: getPinPosition,
    getPinAddress: getPinAddress,
    getCenterPinAddress: getCenterPinAddress,
  };
})();
