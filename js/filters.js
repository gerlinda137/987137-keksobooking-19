'use strict';
(function () {

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInputs = mapFilters.querySelectorAll('input, select');
  var housingType = mapFilters.querySelector('#housing-type');
  var onChange = null;

  var filterHousingType = function (advert) {
    return housingType.value === 'any' || housingType.value === advert.offer.type;
  };

  var check = function (advert) {
    return filterHousingType(advert);
  };

  var onHousingTypeChange = function (evt) {
    if (window.util.isFunction(onChange)) {
      onChange(evt.target.value);
    }
  };

  housingType.addEventListener('change', onHousingTypeChange);

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
    check: check,
  };

})();
