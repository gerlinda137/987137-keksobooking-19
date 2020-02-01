'use strict';
// to do: location x
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

//  general random function
var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// getting random element from array
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

var coordinate = {
  x: getRandomInteger(130, 630), //случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
  y: getRandomInteger(130, 630), //случайное число, координата y метки на карте от 130 до 630.
};

var advertisement = {
  author: {
    avatar: 'img/avatars/user{{xx}}.png',//строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },
  location: coordinate,
  offer: {
    title: 'заголовок предложения',//строка, заголовок предложения
    address: coordinate.x + ', ' + coordinate.y,//строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
    price: getRandomInteger(1000, 5000),//число, стоимость
    type: getRandomArrayElement(TYPES), //строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
    rooms: getRandomInteger(1,5),  //число, количество комнат
    guests: getRandomInteger(1,6), //число, количество гостей, которое можно разместить
    checkin: getRandomArrayElement(CHECKINS), //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    checkout: getRandomArrayElement(CHECKOUTS), //строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
    features: getRandomArrayElements(FEATURES),//массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
    description: 'описание',//строка с описанием,
    photos: getRandomArrayElements(PHOTOS), //массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  }  
}
console.log(advertisement);