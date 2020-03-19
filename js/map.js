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
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var card = null;

  var addPins = function (adverts) {
    var pins = adverts.map(function (advert) {
      return window.renderPin(advert, onPinClick);
    });
    mapPinsContainer.append.apply(mapPinsContainer, pins);
  };

  var removeCard = function () {
    if (card !== null) {
      card.remove();
      card = null;
    }
  };

  var onPinClick = function (advert) {
    removeCard();
    card = window.renderCard(advert);
    mapFiltersContainer.prepend(card);
  };

  window.map = {
    addPins: addPins,
    RECT: MapRect,

    enable: function () {
      map.classList.remove('map--faded');
    },
    disable: function () {
      map.classList.add('map--faded');
      removeCard();
    },
    removePins: function () {
      mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)')
        .forEach(window.util.removeElement);
    }
  };
})();
