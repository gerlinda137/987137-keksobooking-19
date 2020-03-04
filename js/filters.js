'use strict';
(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersInputs = mapFilters.querySelectorAll(
      'input, select, fieldset'
  );

  window.filters = {
    enable: function () {
      mapFiltersInputs.forEach(window.util.unsetDisabled);
    },
    disable: function () {
      mapFiltersInputs.forEach(window.util.setDisabled);
    },
  };
})();
