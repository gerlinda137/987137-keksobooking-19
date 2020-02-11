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

var ENTER_KEY = 'Enter';

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
var generateAdvert = function (id) {
  var coordinate = {
    x: getRandomInteger(0, mapPinsContainer.offsetWidth),
    y: getRandomInteger(130, 630),
  };

  return {
    author: {
      avatar: 'img/avatars/user0' + id + '.png',
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
  var adverts = [];
  for (var i = 1; i <= num; i++) {
    adverts.push(generateAdvert(i));
  }
  return adverts;
};

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderPin = function (advert) {
  var pin = pinTemplate.cloneNode(true);
  var avatar = pin.querySelector('img');
  avatar.src = advert.author.avatar;
  avatar.alt = advert.offer.title;
  return pin;
};


var addingAdvertisementsToMap = function (ads) {
  var fragment = document.createDocumentFragment();
  var renderedAds = [];
  for (var i = 0; i < ads.length; i++) {
    var renderedAd = renderPin(ads[i]);
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


var adForm = document.querySelector('.ad-form');
var inputs = adForm.querySelectorAll('input, select, fieldset');
inputs.forEach(function (element) {
  element.setAttribute('disabled', 'disabled');
});

var reverse = function () {
  inputs.forEach(function (element) {
    element.removeAttribute('disabled');
  });

  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  var mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');
};

var mapPin = document.querySelector('.map__pin--main');

var MAP_PIN_WIDTH = mapPin.offsetWidth;
var MAP_PIN_HEIGHT = mapPin.offsetHeight;

var findPinPosition = function () {
  var left = mapPin.style.left;
  var top = mapPin.style.top;
  left = left.substring(0, left.length - 2); // remove px
  top = top.substring(0, top.length - 2); // remove px
  return (left + 0.5 * MAP_PIN_WIDTH) + ', ' + (top - MAP_PIN_HEIGHT);
};

var findCenterPinPosition = function () {
  var left = mapPin.style.left;
  var top = mapPin.style.top;
  left = left.substring(0, left.length - 2); // remove px
  top = top.substring(0, top.length - 2); // remove px
  return (left + 0.5 * MAP_PIN_WIDTH) + ', ' + (top - 0.5 * MAP_PIN_HEIGHT);
};

var inputAddress = adForm.querySelector('#address');
inputAddress.value = findCenterPinPosition();

var changeAddressValue = function () {
  inputAddress.value = findPinPosition();
};

mapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    reverse();
    changeAddressValue();
  }
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    reverse();
    changeAddressValue();
  }
});

var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
roomNumber.addEventListener('change', function () {
  if (roomNumber.options[roomNumber.selectedIndex].value === '100') {
    for (var i = 0; i < capacity.options.length; i++) {
      if (capacity.options[i].value !== '0') {
        capacity.options[i].setAttribute('disabled', 'disabled');
      } else {
        capacity.options[i].setAttribute('selected', 'selected');
      }
    }
  }
});
