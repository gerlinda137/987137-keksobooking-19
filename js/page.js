'use strict';
(function () {
  var ADVERTISEMENT_AMOUNT = 8;

  var activatePage = function () {
    var adverts = window.generateAdvers(ADVERTISEMENT_AMOUNT);
    if (adverts.length > 0) {
      window.map.addPins(adverts);
      window.filters.enable();
    }
    window.map.enable();
    window.notification.enable();
  };

  var deactivatePage = function () {
    window.notification.disable();
    window.map.disable();
    window.mainPin.reset();
    window.filters.disable();
  };

  var onDomLoad = function () {
    deactivatePage();
  };

  document.addEventListener('DOMContentLoaded', onDomLoad);

  window.notification.setOnReset(function () {
    deactivatePage();
    window.map.removePins();
    window.mainPin.reset();
  });

  window.mainPin.setOnFirstAction(function () {
    activatePage();
  });
})();
