'use strict';
(function () {
  var ADVERTISEMENT_AMOUNT = 8;
  var mapPin = document.querySelector('.map__pin--main');

  var activatePage = function () {
    var adverts = window.generateAdvers(ADVERTISEMENT_AMOUNT);
    if (adverts.length > 0) {
      window.map.addPins(adverts);
      window.map.enable();
      window.notification.enable();
      window.notification.changeAddressValue();
      mapPin.removeEventListener('mousedown', onMapPinMouseDown);
      mapPin.removeEventListener('keydown', onMapPinKeyDown);
    }
  };

  var deactivatePage = function () {
    window.notification.disable();
    window.map.disable();
    mapPin.addEventListener('mousedown', onMapPinMouseDown);
    mapPin.addEventListener('keydown', onMapPinKeyDown);
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

  var onDomLoad = function () {
    deactivatePage();
  };

  document.addEventListener('DOMContentLoaded', onDomLoad);

  window.notification.setOnReset(function () {
    deactivatePage();
    window.map.removePins();
  });
})();
