'use strict';
// to do: location x
var ADVERTISEMENT_AMOUNT = 8;

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo',
];

var CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

var CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var mapPinsContainer = document.querySelector('.map__pins');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var getRandomArrayElements = function (array) {
  var results = [];
  for (var i = 0; i < array.length; i++) {
    if (Math.random() > 0.5) {
      results.push(array[i]);
    }
  }
  return results;
};
var generateAdvertisement = function (index) {
  var coordinate = {
    x: getRandomInteger(0, mapPinsContainer.offsetWidth),
    y: getRandomInteger(130, 630),
  };

  return {
    author: {
      avatar: 'img/avatars/user0' + index + '.png',
    },
    location: coordinate,
    offer: {
      title: 'заголовок предложения',
      address: coordinate.x + ', ' + coordinate.y,
      price: getRandomInteger(1000, 5000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 6),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getRandomArrayElements(FEATURES),
      description: 'описание',
      photos: getRandomArrayElements(PHOTOS),
    }
  };
};

var generateAdvers = function (num) {
  var advertisements = [];
  for (var i = 1; i < num; i++) {
    advertisements.push(generateAdvertisement(i));
  }
  return advertisements;
};

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderAdvertisement = function (advertisement) {
  var pin = pinTemplate.cloneNode(true);
  var avatar = pin.querySelector('img');
  avatar.src = advertisement.author.avatar;
  avatar.alt = advertisement.offer.title;
  return pin;
};


var addingAdvertisementsToMap = function (ads) {
  var fragment = document.createDocumentFragment();
  var renderedAds = [];
  for (var i = 0; i < ads.length; i++) {
    var renderedAd = renderAdvertisement(ads[i]);
    fragment.appendChild(renderedAd);
    renderedAds.push(renderedAd);
  }

  mapPinsContainer.appendChild(fragment);
  var pins = mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');

  for (var j = 0; j < pins.length; j++) {
    var pin = pins[j];
    pin.style.left = (ads[j].location.x - (pin.offsetWidth * 0.5)) + 'px';
    pin.style.top = (ads[j].location.y - (pin.offsetHeight * 0.5)) + 'px';
  }

};

var advertisements = generateAdvers(ADVERTISEMENT_AMOUNT);
addingAdvertisementsToMap(advertisements);


var map = document.querySelector('.map');
map.classList.remove('map--faded');
