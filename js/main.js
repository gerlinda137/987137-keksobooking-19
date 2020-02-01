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
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (Math.random() > 0.5) {
      result.push(array[i]);
    }
  }
  return result;
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

var generateNumberOfAdvertisement = function (advertisementAmount) {
  var advertisements = [];
  for (var i = 0; i < advertisementAmount; i++) {
    advertisements.push(generateAdvertisement(i + 1));
  }
  return advertisements;
};

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderAdvertisement = function (advertisement) {
  var pin = pinTemplate.cloneNode(true);
  pin.style = 'left: ' + (advertisement.location.x - (pinTemplate.offsetWidth * 0.5)) + 'px;' + 'top: ' + (advertisement.location.y - (pinTemplate.offsetHeight * 0.5)) + 'px;';

  var avatar = pin.querySelector('img');
  avatar.src = advertisement.author.avatar;
  avatar.alt = advertisement.offer.title;
  return pin;
};

var advertisements = generateNumberOfAdvertisement(ADVERTISEMENT_AMOUNT);

var documentFragment = document.createDocumentFragment();
for (var i = 0; i < advertisements.length; i++) {
  documentFragment.appendChild(renderAdvertisement(advertisements[i]));
}

mapPinsContainer.appendChild(documentFragment);


var map = document.querySelector('.map');
map.classList.remove('map--faded');
