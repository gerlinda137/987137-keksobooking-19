'use strict';

(function () {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var accommodationType = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var removeLiWithoutAnyFeature = function (features, lihi) {
    for (var i = 0; i < lihi.length; i++) {
      var found = false;
      for (var j = 0; j < features.length; j++) {
        if (lihi[i].classList.contains('popup__feature--' + features[j])) {
          found = true;
        }
      }
      if (!found) {
        lihi[i].remove();
      }
    }
  };

  window.renderCard = function (advert) {
    var card = cardTemplate.cloneNode(true);
    var title = card.querySelector('.popup__title');
    var address = card.querySelector('.popup__text--address');
    var price = card.querySelector('.popup__text--price');
    var type = card.querySelector('.popup__type');
    var capacity = card.querySelector('.popup__text--capacity');
    var time = card.querySelector('.popup__text--time');
    var featuresItems = card.querySelectorAll('.popup__features li');

    title.content = advert.offer.title;
    address.content = advert.offer.address;
    price.content = advert.offer.price + '&#x20bd;/ночь';
    type.content = accommodationType[advert.offer.type];
    capacity.content = advert.offer.rooms + 'комнаты для ' + advert.offer.guests + ' гостей';
    time.content = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    removeLiWithoutAnyFeature(advert.offer.features, featuresItems);

    return card;
  };


  // features = array of strings
  // lihi - array of <li>

})();
