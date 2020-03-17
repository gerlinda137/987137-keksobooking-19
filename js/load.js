'use strict';
(function () {
  var StatusCode = {
    OK: 200,
  };

  var URL = 'https://js.d1ump.academy/keksobooking/data';

  window.load = function (onSuccess, onError) {
    var xhr = window.backend.createRequest('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });


    xhr.send();
  };
})();
