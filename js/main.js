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

var MAIN_BUTTON = 0;

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

var adForm = document.querySelector('.ad-form');
var inputs = adForm.querySelectorAll('input, select, fieldset');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters');
var mapFiltersInputs = mapFilters.querySelectorAll('input, select, fieldset');

var disactivatePage = function () {
  inputs.forEach(function (element) {
    element.disabled = true;
  });

  mapFiltersInputs.forEach(function (element) {
    element.disabled = true;
  });
};

var activatePage = function () {
  inputs.forEach(function (element) {
    element.disabled = false;
  });

  mapFiltersInputs.forEach(function (element) {
    element.disabled = false;
  });

  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  var advertisements = generateAdvers(ADVERTISEMENT_AMOUNT);
  addingAdvertisementsToMap(advertisements);
};

var mapPin = document.querySelector('.map__pin--main');

var MAP_PIN_WIDTH = mapPin.offsetWidth;
var MAP_PIN_HEIGHT = mapPin.offsetHeight;

var getPinPosition = function () {
  var left = mapPin.offsetLeft;
  var top = mapPin.offsetTop;
  return {left: left, top: top};
};

var getPinAddress = function () {
  var pinPos = getPinPosition();
  return Math.floor((pinPos.left + 0.5 * MAP_PIN_WIDTH)) + ', ' + Math.floor((pinPos.top - MAP_PIN_HEIGHT));
};

var getCenterPinAddress = function () {
  var pinPos = getPinPosition();
  return Math.floor((pinPos.left + 0.5 * MAP_PIN_WIDTH)) + ', ' + Math.floor((pinPos.top - 0.5 * MAP_PIN_HEIGHT));
};

var addressInput = adForm.querySelector('#address');
addressInput.value = getCenterPinAddress();

var changeAddressValue = function () {
  addressInput.value = getPinAddress();
};

var activatePageAndChangeAddress = function () {
  activatePage();
  changeAddressValue();
};

var onMapPinMouseDown = function (evt) {
  if (evt.button === MAIN_BUTTON) {
    activatePageAndChangeAddress();
  }
  mapPin.removeEventListener('mousedown', onMapPinMouseDown);
};

mapPin.addEventListener('mousedown', onMapPinMouseDown);

var onMapPinKeyDown = function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePageAndChangeAddress();
  }
  mapPin.removeEventListener('keydown', onMapPinKeyDown);
};

mapPin.addEventListener('keydown', onMapPinKeyDown);

var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');

var validateRoomsAndCapacity = function () {
  var roomsNum = +roomNumber.value;

  for (var i = 0; i < capacity.options.length; i++) {
    var option = capacity.options[i];
    var guestsNum = +option.value;

    var enabled = (roomsNum === 100 && guestsNum === 0) || (guestsNum <= roomsNum && guestsNum !== 0);

    option.disabled = !enabled;

    if (enabled) {
      capacity.selectedIndex = i;
    }
  }
};

var onRoomNumberChange = function () {
  validateRoomsAndCapacity();
};

roomNumber.addEventListener('change', onRoomNumberChange);
validateRoomsAndCapacity();

disactivatePage();
