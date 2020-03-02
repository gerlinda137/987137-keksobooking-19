'use strict';
(function () {
  var ADVERTISEMENT_AMOUNT = 8;

  var activatePage = function () {
    var adverts = window.generateAdvers(ADVERTISEMENT_AMOUNT);
    if (adverts.length > 0) {
      window.map.addPins(adverts);
      window.map.enable();
      window.notification.enable();
      // window.notification.changeAddressValue();
    }
  };

  var deactivatePage = function () {
    window.notification.disable();
    window.map.disable();
    window.mainPin.reset();
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
