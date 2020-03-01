'use strict';

(function () {

  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32
  };

  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__pins');
  var mapPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInputs = mapFilters.querySelectorAll(
      'input, select, fieldset'
  );

  var addPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (element) {
      var renderedAd = window.renderPin(element);
      fragment.appendChild(renderedAd);
    });
    mapPinsContainer.appendChild(fragment);
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
    enable: function () {
      mapFiltersInputs.forEach(function (element) {
        element.disabled = false;
      });
      map.classList.remove('map--faded');
    },
  };
})();
