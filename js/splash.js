'use strict';

(function () {
  var MessageType = {
    SUCCESS: 'success',
    ERROR: 'error',
  };

  var main = document.querySelector('main');

  var messageToTemplate = {
    error: document.querySelector('#error').content.querySelector('.error'),
    success: document.querySelector('#success').content.querySelector('.success'),
  };

  var addEventListeners = function (message, type) {
    var textBlockClass = type + '__message';

    var isNotTextBlock = function (evt) {
      return !evt.target.classList.contains(textBlockClass);
    };

    var removeMessage = function () {
      message.remove();
      document.removeEventListener('keydown', onMessageEscKeydown);
    };

    var onMessageEscKeydown = function (evt) {
      if (window.util.isEscapeKey(evt)) {
        removeMessage();
      }
    };

    message.addEventListener('click', function (evt) {
      if (window.util.isMainMouseButton(evt) && isNotTextBlock(evt)) {
        removeMessage();
      }
    });

    document.addEventListener('keydown', onMessageEscKeydown);
  };

  var makeShowMessage = function (type) {
    return function showMessage() {
      var message = messageToTemplate[type].cloneNode(true);

      main.appendChild(message);
      addEventListeners(message, type);
    };
  };

  window.splash = {
    showError: makeShowMessage(MessageType.ERROR),
    showSuccess: makeShowMessage(MessageType.SUCCESS),
  };
})();
