'use strict';

(function () {
  var PinSize = {
    HEIGHT: 70,
    RADIUS: 50 / 2
  };

  var mapPinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');

  var renderPin = function (advert) {
    var pin = pinTemplate.cloneNode(true);
    var avatar = pin.querySelector('img');
    pin.style.left = advert.location.x - PinSize.RADIUS + 'px';
    pin.style.top = advert.location.y - PinSize.HEIGHT + 'px';
    avatar.src = advert.author.avatar;
    avatar.alt = advert.offer.title;
    return pin;
  };

  var addPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      var renderedAd = renderPin(adverts[i]);
      fragment.appendChild(renderedAd);
    }
    mapPinsContainer.appendChild(fragment);
  };

  var mapPin = document.querySelector('.map__pin--main');

  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 80,
    RADIUS: 32
  };

  var getPinPosition = function () {
    var left = mapPin.offsetLeft;
    var top = mapPin.offsetTop;
    return {left: left, top: top};
  };

  var getPinAddress = function () {
    var pinPos = window.map.getPinPosition();
    return (
      Math.floor(pinPos.left + 0.5 * MainPinSize.WIDTH) +
      ', ' +
      Math.floor(pinPos.top + MainPinSize.HEIGHT)
    );
  };

  var getCenterPinAddress = function () {
    var pinPos = getPinPosition();
    return (
      Math.floor(pinPos.left + MainPinSize.RADIUS) +
      ', ' +
      Math.floor(pinPos.top + MainPinSize.RADIUS)
    );
  };

  window.map = {
    addPins: addPins,
    MainPinSize: MainPinSize,
    getPinPosition: getPinPosition,
    getPinAddress: getPinAddress,
    getCenterPinAddress: getCenterPinAddress,
  };
})();
