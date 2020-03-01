'use strict';
(function () {
  var ADVERTISEMENT_AMOUNT = 8;

  var adForm = document.querySelector('.ad-form');
  var inputs = adForm.querySelectorAll('input, select, fieldset');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInputs = mapFilters.querySelectorAll('input, select, fieldset');

  var deactivatePage = function () {
    inputs.forEach(function (element) {
      element.disabled = true;
    });

    mapFiltersInputs.forEach(function (element) {
      element.disabled = true;
    });
  };

  var onMapPinMouseDown = function (evt) {
    if (window.util.isMainMouseButton(evt)) {
      intialActivatePage();
    }
  };
  var onMapPinKeyDown = function (evt) {
    if (window.util.isEnterKey(evt)) {
      intialActivatePage();
    }
  };
  var activatePage = function () {
    inputs.forEach(function (element) {
      element.disabled = false;
    });

    mapFiltersInputs.forEach(function (element) {
      element.disabled = false;
    });
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    var adverts = window.generateAdvers(ADVERTISEMENT_AMOUNT);
    window.map.addPins(adverts);
  };

  var mapPin = document.querySelector('.map__pin--main');

  mapPin.addEventListener('mousedown', onMapPinMouseDown);

  mapPin.addEventListener('keydown', onMapPinKeyDown);

  var intialActivatePage = function () {
    activatePage();
    window.form.changeAddressValue();
    mapPin.removeEventListener('mousedown', onMapPinMouseDown);
    mapPin.removeEventListener('keydown', onMapPinKeyDown);
  };

  deactivatePage();
})();
