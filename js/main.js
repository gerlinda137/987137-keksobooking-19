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
] 

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
    x: getRandomInteger(0, mapPinsContainer.offsetWidth), //случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    y: getRandomInteger(130, 630), //случайное число, координата y метки на карте от 130 до 630.
  };

  return {
    author: {
      avatar: 'img/avatars/user0' + index +'.png',//строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    },
    location: coordinate,
    offer: {
      title: 'заголовок предложения',//строка, заголовок предложения
      address: coordinate.x + ', ' + coordinate.y,//строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      price: getRandomInteger(1000, 5000),//число, стоимость
      type: getRandomArrayElement(TYPES), //строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
      rooms: getRandomInteger(1, 5),  //число, количество комнат
      guests: getRandomInteger(1, 6), //число, количество гостей, которое можно разместить
      checkin: getRandomArrayElement(CHECKINS), //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      checkout: getRandomArrayElement(CHECKOUTS), //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      features: getRandomArrayElements(FEATURES),//массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      description: 'описание',//строка с описанием,
      photos: getRandomArrayElements(PHOTOS), //массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    }
  };  
}

var generateNumberOfAdvertisement = function (advertisementAmount) {
  var advertisements = [];
  for (var i = 0; i < advertisementAmount; i++) {
    advertisements.push(generateAdvertisement(i+1));
  }
  return advertisements;
};

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var renderAdvertisement = function (advertisement) {
  var pin = pinTemplate.cloneNode(true);
  pin.style = "left: " + (advertisement.location.x - (pinTemplate.offsetWidth * 0.5)) + "px;" + "top: " + (advertisement.location.y - (pinTemplate.offsetHeight * 0.5))  + "px;";

  var avatar = pin.querySelector('img');
  avatar.src = advertisement.author.avatar;
  avatar.alt = advertisement.offer.title;
  return pin;
};

var advertisements = generateNumberOfAdvertisement(ADVERTISEMENT_AMOUNT);

var documentFragment = document.createDocumentFragment();
for (var i = 0; i < advertisements.length; i++) {
  documentFragment.appendChild(renderAdvertisement(advertisements[i]));
};

var mapPinsContainer = document.querySelector('.map__pins');

mapPinsContainer.appendChild(documentFragment);


var map = document.querySelector('.map');
map.classList.remove('map--faded');
