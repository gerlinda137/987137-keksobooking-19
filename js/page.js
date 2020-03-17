'use strict';
(function () {
  var onLoadError = function () {
    window.splash.showMessage('#error', '.error', '.error__button');
  };

  var activatePage = function () {

    window.load(function (adverts) {
      if (adverts.length > 0) {
        window.map.addPins(adverts);
        window.filters.enable();
      }
    }, onLoadError);

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
  });

  window.mainPin.setOnFirstAction(function () {
    activatePage();
  });
})();
