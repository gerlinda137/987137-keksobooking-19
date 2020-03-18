'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  window.upload = function (data, onSuccess, onError) {
    var xhr = window.backend.createRequest('POST', URL);

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    window.backend.addErrorListeners(xhr, onError);

    xhr.send(data);
  };
})();
