'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__pins');

  var addPins = function (adverts) {
    var pins = adverts.map(window.renderPin);
    mapPinsContainer.append.apply(mapPinsContainer, pins);
  };

  window.map = {
    addPins: addPins,

    enable: function () {
      window.filters.enable();
      map.classList.remove('map--faded');
    },
    disable: function () {
      window.filters.disable();
      map.classList.add('map--faded');
    },
    removePins: function () {
      mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)')
        .forEach(window.util.removeElement);
    }
  };
})();
