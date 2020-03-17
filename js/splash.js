'use strict';

(function () {
  var showMessage = function (elementId, elementClass, exitButtonSelector) {
    var message = document.querySelector(elementId).content.querySelector(elementClass);
    var messageDiv = message.cloneNode(true);
    document.body.appendChild(messageDiv);

    var removeMessage = function (evt) {
      if (window.util.isMainMouseButton(evt) || window.util.isEscapeKey(evt)) {
        messageDiv.remove();
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
    messageDiv.addEventListener('click', onMessageClick);
    document.body.addEventListener('keydown', onDocumentKeydown);
    if (typeof exitButton === 'string') {
      var exitButton = messageDiv.querySelector(exitButtonSelector);
      exitButton.addEventListener('click', onExitButtonClick);
    }
  };

  window.splash = {
    showMessage: showMessage,
  };
})();
