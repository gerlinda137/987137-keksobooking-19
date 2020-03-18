'use strict';
(function () {
  var KeyboardKey = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
  };

  var MouseButton = {
    MAIN: 0,
  };


  window.util = {
    isEnterKey: function (evt) {
      return evt.key === KeyboardKey.ENTER_KEY;
    },

    isEscapeKey: function (evt) {
      return evt.key === KeyboardKey.ESCAPE_KEY;
    },

    isMainMouseButton: function (evt) {
      return evt.button === MouseButton.MAIN;
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
