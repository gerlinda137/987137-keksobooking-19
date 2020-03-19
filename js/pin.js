'use strict';

(function () {
  var PinSize = {
    HEIGHT: 70,
    RADIUS: 50 / 2
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.renderPin = function (advert, onSelected) {
    var pin = pinTemplate.cloneNode(true);
    var avatar = pin.querySelector('img');

    pin.style.left = (advert.location.x - PinSize.RADIUS) + 'px';
    pin.style.top = (advert.location.y - PinSize.HEIGHT) + 'px';
    avatar.src = advert.author.avatar;
    avatar.alt = advert.offer.title;

    pin.addEventListener('click', function () {
      var activePins = document.querySelectorAll('.map__pin--active');
      activePins.forEach(function (currentPin) {
        currentPin.classList.remove('map__pin--active');
      });
      pin.classList.add('map__pin--active');
      onSelected(advert);
    });

    return pin;
  };
})();
