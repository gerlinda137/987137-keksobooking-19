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

  var renderCardPhotos = function (card, photosUrls) {
    var photo = card.querySelector('.popup__photos img');
    var photos = card.querySelector('.popup__photos');
    var renderPhotos = document.createDocumentFragment();
    photosUrls.forEach(function (photoUrl) {
      var photoElement = photo.cloneNode(true);
      photoElement.src = photoUrl;
      renderPhotos.appendChild(photoElement);
    });
    photo.remove();
    photos.appendChild(renderPhotos);
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
    var description = card.querySelector('.popup__description ');
    var avatar = card.querySelector('.popup__avatar');
    var closeButton = card.querySelector('.popup__close');


    title.textContent = advert.offer.title;
    address.textContent = advert.offer.address;
    price.textContent = advert.offer.price + '&#x20bd;/ночь';
    type.textContent = accommodationType[advert.offer.type];
    capacity.textContent = advert.offer.rooms + 'комнаты для ' + advert.offer.guests + ' гостей';
    time.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    removeLiWithoutAnyFeature(advert.offer.features, featuresItems);
    description.textContent = advert.offer.description;
    avatar.src = advert.author.avatar;
    renderCardPhotos(card, advert.offer.photos);

    var onButtonClose = function () {
      card.remove();
    };

    closeButton.addEventListener('click', onButtonClose);

    return card;

  };


  // features = array of strings
  // lihi - array of <li>

})();
