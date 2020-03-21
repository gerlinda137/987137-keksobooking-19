'use strict';
(function () {
  var StatusCode = {
    OK: 200,
  };

  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = window.backend.createRequest('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    window.backend.addErrorListeners(xhr, onError);

    xhr.send();
  };
})();
