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

  var getPinAddressPrototype = function (xCorrection, yCorrection) {
    var pinPos = getPinPosition();
    return (
      Math.floor(pinPos.left + xCorrection) +
      ', ' +
      Math.floor(pinPos.top + yCorrection)
    );
  };

  var getPinAddress = function () {
    return getPinAddressPrototype(0.5 * MainPinSize.WIDTH, MainPinSize.HEIGHT);
  };

  var getCenterPinAddress = function () {
    return getPinAddressPrototype(MainPinSize.RADIUS, MainPinSize.RADIUS);
  };

  window.map = {
    addPins: addPins,
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
