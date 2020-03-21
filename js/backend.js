'use strict';

(function () {
  var TIMEOUT_MS = 10000;

  var createRequest = function (method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);
    xhr.timeout = TIMEOUT_MS;
    return xhr;
  };

  var addErrorListeners = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  window.backend = {
    createRequest: createRequest,
    addErrorListeners: addErrorListeners,
  };

})();
