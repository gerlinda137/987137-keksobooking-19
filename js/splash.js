'use strict';

(function () {
  var MessageType = {
    SUCCESS: 'success',
    ERROR: 'error',
  };

  var messageToTemplate = {
    error: document.querySelector('#error').content.querySelector('.error'),
    success: document.querySelector('#success').content.querySelector('.success'),
  };

  var showMessage = function (type) {
    var message = messageToTemplate[type].cloneNode(true);
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
    if (type === MessageType.ERROR) {
      var exitButton = message.querySelector('.error__button');
      exitButton.addEventListener('click', onExitButtonClick);
    }
  };

  window.splash = {
    showError: function () {
      showMessage(MessageType.ERROR);
    },
    showSuccess: function () {
      showMessage(MessageType.SUCCESS);
    },
  };
})();
