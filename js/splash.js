'use strict';

(function () {
  var showMessage = function (elementId, elementClass, exitButtonSelector) {
    var message = document.querySelector(elementId).content.querySelector(elementClass).cloneNode(true);
    document.body.appendChild(message);

    var removeMessage = function (evt) {
      if (window.util.isMainMouseButton(evt) || window.util.isEscapeKey(evt)) {
        message.remove();
        document.body.removeEventListener('keydown', onDocumentKeydown);
      }
    };

    var onMessageClick = function (evt) {
      removeMessage(evt);
    };

    var onDocumentKeydown = function (evt) {
      removeMessage(evt);
    };

    var onExitButtonClick = function (evt) {
      removeMessage(evt);
    };
    message.addEventListener('click', onMessageClick);
    document.body.addEventListener('keydown', onDocumentKeydown);
    if (typeof exitButton === 'string') {
      var exitButton = message.querySelector(exitButtonSelector);
      exitButton.addEventListener('click', onExitButtonClick);
    }
  };

  window.splash = {
    showError: function () {
      showMessage('#error', '.error', '.error__button');
    },
    showSuccess: function () {
      showMessage('#success', '.success');
    },
  };
})();
