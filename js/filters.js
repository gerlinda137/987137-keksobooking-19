'use strict';
(function () {
  var FILTER_ANY = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInputs = mapFilters.querySelectorAll('input, select');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var onChange = null;

  var filterHousingType = function (advert) {
    return housingType.value === FILTER_ANY || housingType.value === advert.offer.type;
  };

  var filterHousingRooms = function (advert) {
    return housingRooms.value === FILTER_ANY || parseInt(housingRooms.value, 10) === advert.offer.rooms;
  };

  var filterHousingGuests = function (advert) {
    return housingGuests.value === FILTER_ANY || parseInt(housingGuests.value, 10) === advert.offer.guests;
  };

  var checkOption = function (advert) {
    return filterHousingType(advert)
          && filterHousingRooms(advert)
          && filterHousingGuests(advert);
  };

  var onMapFiltersChange = function (evt) {
    if (window.util.isFunction(onChange)) {
      onChange(evt.target.value);
    }
  };

  mapFilters.addEventListener('change', onMapFiltersChange);

  window.filters = {
    enable: function () {
      mapFiltersInputs.forEach(window.util.unsetDisabled);
    },
    disable: function () {
      mapFiltersInputs.forEach(window.util.setDisabled);
      mapFilters.reset();
    },
    setOnChange: function (callback) {
      onChange = callback;
    },
    checkOption: checkOption,
  };

})();
