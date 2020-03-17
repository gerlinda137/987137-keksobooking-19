'use strict';

(function () {
  var showMessage = function (elementId, elementClass, exitButtonSelector) {
    var message = document.querySelector(elementId).content.querySelector(elementClass);
    var messageDiv = message.cloneNode(true);
    document.body.appendChild(messageDiv);

    var onMessagePress = function (evt) {
      if (window.util.isMainMouseButton(evt) || window.util.isEscKey(evt)) {
        messageDiv.remove();
        document.body.removeEventListener('keydown', onMessagePress);
      }
    };

    messageDiv.addEventListener('click', onMessagePress);
    document.body.addEventListener('keydown', onMessagePress);
    if (typeof exitButton === 'string') {
      var exitButton = messageDiv.querySelector(exitButtonSelector);
      exitButton.addEventListener('click', onMessagePress);
    }
  };

  window.splash = {
    showMessage: showMessage,
  };
})();
