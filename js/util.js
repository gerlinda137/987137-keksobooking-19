'use strict';
(function () {
  var ENTER_KEY = 'Enter';
  var MAIN_BUTTON = 0;

  window.util = {
    isEnterKey: function (evt) {
      return evt.key === ENTER_KEY;
    },

    isMainMouseButton: function (evt) {
      return evt.button === MAIN_BUTTON;
    },

    setDisabled: function (element) {
      element.disabled = true;
    },

    unsetDisabled: function (element) {
      element.disabled = false;
    },

    isFunction: function (value) {
      return typeof value === 'function';
    },

    removeElement: function (element) {
      element.remove();
    },

    clampNumber: function (value, min, max) {
      return Math.min(Math.max(value, min), max);
    },
  };
})();
