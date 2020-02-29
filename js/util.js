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
  };
})();
