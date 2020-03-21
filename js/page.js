'use strict';
(function () {
  var onLoadError = function () {
    window.splash.showError();
  };

  var allAdverts = null;

  var showPins = function (requiredAdverts) {
    window.map.removePins();
    window.map.addPins(requiredAdverts.slice(0, 5));
  };

  var activatePage = function () {

    window.load(function (adverts) {
      allAdverts = adverts.filter(function (advert) {
        return advert.offer;
      });

      var reducedAdverts = allAdverts;

      if (allAdverts.length > 0) {
        showPins(reducedAdverts);
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
