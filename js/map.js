'use strict';

(function () {

  // var MainPinSize = {
  //   WIDTH: 65,
  //   HEIGHT: 80,
  //   RADIUS: 32
  // };

  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__pins');
  // var mapPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInputs = mapFilters.querySelectorAll(
      'input, select, fieldset'
  );

  var addPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    adverts.forEach(function (element) {
      var renderedAd = window.renderPin(element);
      fragment.appendChild(renderedAd);
    });
    mapPinsContainer.appendChild(fragment);
  };

  window.map = {
    addPins: addPins,

    enable: function () {
      mapFiltersInputs.forEach(window.util.unsetDisabled);
      map.classList.remove('map--faded');
    },
    disable: function () {
      mapFiltersInputs.forEach(window.util.setDisabled);
      map.classList.add('map--faded');
    },
    removePins: function () {
      mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)')
        .forEach(window.util.removeElement);
    }
  };
})();
