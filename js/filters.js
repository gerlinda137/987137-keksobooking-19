'use strict';
(function () {
  var FilterOptions = {
    ANY: 'any',
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
  };

  var PriceRange = {
    MAX_LOW: 10000,
    MIN_MIDDLE: 10000,
    MAX_MIDDLE: 50000,
    MIN_HIGH: 50000,
  };

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInputs = mapFilters.querySelectorAll('input, select');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var onChange = null;

  var filterHousingType = function (advert) {
    return housingType.value === FilterOptions.ANY || housingType.value === advert.offer.type;
  };

  var filterHousingPrice = function (advert) {
    if (housingPrice.value === FilterOptions.LOW) {
      return advert.offer.price <= PriceRange.MAX_LOW;
    }
    if (housingPrice.value === FilterOptions.MIDDLE) {
      return advert.offer.price >= PriceRange.MIN_MIDDLE && advert.offer.price <= PriceRange.MIN_MIDDLE;
    }
    if (housingPrice.value === FilterOptions.HIGH) {
      return advert.offer.price >= PriceRange.MIN_HIGH;
    } else {
      return housingPrice.value === FilterOptions.ANY;
    }
  };

  var filterHousingRooms = function (advert) {
    return housingRooms.value === FilterOptions.ANY || parseInt(housingRooms.value, 10) === advert.offer.rooms;
  };

  var filterHousingGuests = function (advert) {
    return housingGuests.value === FilterOptions.ANY || parseInt(housingGuests.value, 10) === advert.offer.guests;
  };

  var checkOption = function (advert) {
    return filterHousingType(advert)
          && filterHousingRooms(advert)
          && filterHousingGuests(advert)
          && filterHousingPrice(advert);
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
