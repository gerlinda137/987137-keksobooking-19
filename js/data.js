'use strict';

(function () {

  var TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var CHECKINS = ['12:00', '13:00', '14:00'];

  var CHECKOUTS = ['12:00', '13:00', '14:00'];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
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
  var generateAdvert = function (id) {
    var coordinate = {
      x: getRandomInteger(0, mapPinsContainer.offsetWidth),
      y: getRandomInteger(130, 630)
    };

    return {
      author: {
        avatar: 'img/avatars/user0' + id + '.png'
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
        photos: getRandomArrayElements(PHOTOS)
      }
    };
  };

  window.generateAdvers = function (num) {
    var adverts = [];
    for (var i = 1; i <= num; i++) {
      adverts.push(generateAdvert(i));
    }
    return adverts;
  };
})();
