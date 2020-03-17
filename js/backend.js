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


  window.backend = {
    createRequest: createRequest,
  };

})();
