'use strict';
(function () {
  var MAX_PINS_ALLOWED = 5;

  var onAdvertsLoadError = function () {
    window.splash.showError();
  };

  var allAdverts = null;

  var showPins = function (adverts) {
    window.map.removePins();
    window.map.addPins(adverts.slice(0, MAX_PINS_ALLOWED));
  };

  var onAdvertsLoad = function (adverts) {
    allAdverts = adverts.filter(function (advert) {
      return advert.offer;
    });

    if (allAdverts.length > 0) {
      showPins(allAdverts);
      window.filters.enable();
    }
  };

  var activatePage = function () {

    window.load(onAdvertsLoad, onAdvertsLoadError);

    window.map.enable();
    window.notification.enable();
  };

  var deactivatePage = function () {
    window.notification.disable();
    window.map.disable();
    window.mainPin.reset();
    window.filters.disable();

    allAdverts = null;

  };

  var onDomLoad = function () {
    deactivatePage();
  };

  document.addEventListener('DOMContentLoaded', onDomLoad);

  window.notification.setOnReset(function () {
    window.map.removePins();
    deactivatePage();
  });

  window.notification.setOnSubmit(function () {
    window.map.removePins();
    deactivatePage();
  });

  window.filters.setOnChange(function (housingType) {
    if (housingType === 'any') {
      showPins(allAdverts);

    } else {
      var filteredAdverts = allAdverts.filter(function (advert) {
        return advert.offer.type === housingType;
      });
      showPins(filteredAdverts);
    }
  });

  window.mainPin.setOnFirstAction(function () {
    activatePage();
  });
})();
