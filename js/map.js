'use strict';

(function () {
  var MapRect = {
    LEFT: 0,
    RIGHT: 1200,
    TOP: 130,
    BOTTOM: 630,
  };

  var map = document.querySelector('.map');
  var mapPinsContainer = map.querySelector('.map__pins');

  var addPins = function (adverts) {
    var pins = adverts.map(function (advert) {
      return window.renderPin(advert, onPinClick);
    });
    mapPinsContainer.append.apply(mapPinsContainer, pins);
  };

  var deactivatePins = function () {
    var activePins = document.querySelectorAll('.map__pin--active');
    activePins.forEach(function (currentPin) {
      currentPin.classList.remove('map__pin--active');
    });
  };

  var onPinClick = function (pin, advert) {
    deactivatePins();

    window.card.remove();
    window.card.show(advert, map);
    pin.classList.add('map__pin--active');
  };

  var handleOnCardRemove = function () {
    deactivatePins();
  };

  window.card.setOnRemove(handleOnCardRemove);

  window.map = {
    addPins: addPins,
    RECT: MapRect,

    enable: function () {
      map.classList.remove('map--faded');
    },
    disable: function () {
      map.classList.add('map--faded');
      deactivatePins();
      window.card.remove();
    },
    removePins: function () {
      deactivatePins();
      window.card.remove();
      mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)')
        .forEach(window.util.removeElement);
    },
    deactivatePins: deactivatePins,
  };
})();
