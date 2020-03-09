'use strict';

(function () {
  var makeMouseDownHandler = function (onStartMove, onMove) {
    return function onMouseDown(evt) {
      evt.preventDefault();

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        onMove(moveEvt);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mousemove', onStartMove, {capture: true});
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousemove', onStartMove, {once: true, capture: true});
      document.addEventListener('mouseup', onMouseUp, {once: true});
    };
  };

  window.dnd = {
    makeMouseDownHandler: makeMouseDownHandler,
  };
})();
