'use strict';
(function () {
  // var ADVERTISEMENT_AMOUNT = 8;

  var activatePage = function () {
    // var adverts = window.generateAdvers(ADVERTISEMENT_AMOUNT);

    window.load(function (adverts) {
      if (adverts.length > 0) {
        window.map.addPins(adverts);
        window.filters.enable();
      }
    }, function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    });

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
