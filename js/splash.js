'use strict';

(function () {
  var showMessage = function (elementId, elementClass, exitButtonSelector) {
    var messageTemplate = document.querySelector(elementId).content;
    var message = messageTemplate.cloneNode(true);
    document.body.appendChild(message);

    var messageDiv = document.querySelector(elementClass);
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

  // var showSuccess = function () {

  //   var successMessageTemplate = document.querySelector('#success').content;
  //   var successMessage = successMessageTemplate.cloneNode(true);
  //   document.body.appendChild(successMessage);

  //   var successMessageDiv = document.querySelector('.success');
  //   var onSuccessMessagePress = function (evt1) {
  //     if (window.util.isMainMouseButton(evt1) || window.util.isEscKey(evt1)) {
  //       successMessageDiv.remove();
  //       document.body.removeEventListener('keydown', onSuccessMessagePress);
  //     }
  //   };

  //   successMessageDiv.addEventListener('click', onSuccessMessagePress);
  //   document.body.addEventListener('keydown', onSuccessMessagePress);
  // };

  // var showError = function () {
  //   var errorMessageTemplate = document.querySelector('#error').content;
  //   var errorMessage = errorMessageTemplate.cloneNode(true);
  //   document.body.appendChild(errorMessage);

  //   var errorMessageDiv = document.querySelector('.error');
  //   var onErrorMessagePress = function (evt1) {
  //     if (window.util.isMainMouseButton(evt1) || window.util.isEscKey(evt1)) {
  //       errorMessageDiv.remove();
  //       document.body.removeEventListener('keydown', onErrorMessagePress);
  //     }
  //   };

  //   var errorButton = errorMessageDiv.querySelector('.error__button');

  //   errorMessageDiv.addEventListener('click', onErrorMessagePress);
  //   errorButton.addEventListener('click', onErrorMessagePress);
  //   document.body.addEventListener('keydown', onErrorMessagePress);
  // };

  window.splash = {
    // showSuccess: showSuccess,
    // showError: showError,
    showMessage: showMessage,
  };
})();
