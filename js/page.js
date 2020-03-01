'use strict';
(function () {
  var ADVERTISEMENT_AMOUNT = 8;

  var adForm = document.querySelector('.ad-form');
  var inputs = adForm.querySelectorAll('input, select, fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInputs = mapFilters.querySelectorAll('input, select, fieldset');

  var deactivatePage = function () {
    inputs.forEach(window.util.setDisabled);

    mapFiltersInputs.forEach(function (element) {
      element.disabled = true;
    });
  };

  var onMapPinMouseDown = function (evt) {
    if (window.util.isMainMouseButton(evt)) {
      activatePage();
    }
  };
  var onMapPinKeyDown = function (evt) {
    if (window.util.isEnterKey(evt)) {
      activatePage();
    }
  };
  var activatePage = function () {
    var adverts = window.generateAdvers(ADVERTISEMENT_AMOUNT);
    if (adverts.length > 0) {
      window.map.addPins(adverts);
      window.map.enable();
      window.advertForm.enable();
      window.advertForm.changeAddressValue();
      mapPin.removeEventListener('mousedown', onMapPinMouseDown);
      mapPin.removeEventListener('keydown', onMapPinKeyDown);
    }
  };

  var mapPin = document.querySelector('.map__pin--main');

  mapPin.addEventListener('mousedown', onMapPinMouseDown);

  mapPin.addEventListener('keydown', onMapPinKeyDown);

  var onDomLoad = function () {
    deactivatePage();
  };

  document.addEventListener('DOMContentLoaded', onDomLoad);
})();
