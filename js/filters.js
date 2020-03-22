'use strict';
(function () {
  var FilterOption = {
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
    return housingType.value === FilterOption.ANY || housingType.value === advert.offer.type;
  };

  var filterHousingPrice = function (advert) {
    if (housingPrice.value === FilterOption.LOW) {
      return advert.offer.price <= PriceRange.MAX_LOW;
    }
    if (housingPrice.value === FilterOption.MIDDLE) {
      return advert.offer.price >= PriceRange.MIN_MIDDLE && advert.offer.price <= PriceRange.MIN_MIDDLE;
    }
    if (housingPrice.value === FilterOption.HIGH) {
      return advert.offer.price >= PriceRange.MIN_HIGH;
    } else {
      return housingPrice.value === FilterOption.ANY;
    }
  };

  var filterHousingRooms = function (advert) {
    return housingRooms.value === FilterOption.ANY || parseInt(housingRooms.value, 10) === advert.offer.rooms;
  };

  var filterHousingGuests = function (advert) {
    return housingGuests.value === FilterOption.ANY || parseInt(housingGuests.value, 10) === advert.offer.guests;
  };

  var filterHousingFeatures = function (advert) {
    var checkedFeatures = mapFilters.querySelectorAll('#housing-features input:checked');
    if (checkedFeatures.length === 0) {
      return true;
    }
    for (var i = 0; i < checkedFeatures.length; i++) {
      if (!advert.offer.features.includes(checkedFeatures[i].value)) {
        return false;
      }
    }
    return true;
  };

  var checkOption = function (advert) {
    return filterHousingType(advert)
          && filterHousingRooms(advert)
          && filterHousingGuests(advert)
          && filterHousingPrice(advert)
          && filterHousingFeatures(advert);
  };

  var onMapFiltersChange = window.debounce(function (evt) {
    if (window.util.isFunction(onChange)) {
      onChange(evt.target.value);
    }
  });

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
