'use strict';

(function () {
  var mapPinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');

  var PinSize = {
    HEIGHT: 70,
    RADIUS: 50 / 2
  };
  var renderPin = function (advert) {
    var pin = pinTemplate.cloneNode(true);
    var avatar = pin.querySelector('img');
    pin.style.left = advert.location.x - PinSize.RADIUS + 'px';
    pin.style.top = advert.location.y - PinSize.HEIGHT + 'px';
    avatar.src = advert.author.avatar;
    avatar.alt = advert.offer.title;
    return pin;
  };

  window.addPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      var renderedAd = renderPin(adverts[i]);
      fragment.appendChild(renderedAd);
    }
    mapPinsContainer.appendChild(fragment);
  };
})();
