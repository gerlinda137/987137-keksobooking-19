'use strict';
// to do: location x
var ADVERTISEMENT_AMOUNT = 8;

var ENTER_KEY = 'Enter';

var MAIN_BUTTON = 0;


var adForm = document.querySelector('.ad-form');
var inputs = adForm.querySelectorAll('input, select, fieldset');
var mapElement = document.querySelector('.map');
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

var activatePage = function () {
  inputs.forEach(function (element) {
    element.disabled = false;
  });

  mapFiltersInputs.forEach(function (element) {
    element.disabled = false;
  });
  mapElement.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  var adverts = window.generateAdvers(ADVERTISEMENT_AMOUNT);
  window.map.addPins(adverts);
};


var onMapPinMouseDown = function (evt) {
  if (evt.button === MAIN_BUTTON) {
    intialActivatePage();
  }
};

var mapPin = document.querySelector('.map__pin--main');

mapPin.addEventListener('mousedown', onMapPinMouseDown);

var onMapPinKeyDown = function (evt) {
  if (evt.key === ENTER_KEY) {
    intialActivatePage();
  }
};

mapPin.addEventListener('keydown', onMapPinKeyDown);

var intialActivatePage = function () {
  activatePage();
  window.form.changeAddressValue();
  mapPin.removeEventListener('mousedown', onMapPinMouseDown);
  mapPin.removeEventListener('keydown', onMapPinKeyDown);
};

deactivatePage();
