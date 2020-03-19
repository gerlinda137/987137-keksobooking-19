'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var accommodationTypeEnToRu = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  var removeLiWithoutAnyFeature = function (features, featuresElements) {
    for (var i = 0; i < featuresElements.length; i++) {
      var found = false;
      for (var j = 0; j < features.length; j++) {
        if (featuresElements[i].classList.contains('popup__feature--' + features[j])) {
          found = true;
          break;
        }
      }
      if (!found) {
        featuresElements[i].remove();
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
    var offer = advert.offer;
    var card = cardTemplate.cloneNode(true);
    var title = card.querySelector('.popup__title');
    var address = card.querySelector('.popup__text--address');
    var price = card.querySelector('.popup__text--price');
    var type = card.querySelector('.popup__type');
    var capacity = card.querySelector('.popup__text--capacity');
    var time = card.querySelector('.popup__text--time');
    var features = card.querySelector('.popup__features');
    var featuresItems = features.querySelectorAll('li');
    var description = card.querySelector('.popup__description ');
    var avatar = card.querySelector('.popup__avatar');
    var closeButton = card.querySelector('.popup__close');
    var photos = card.querySelector('.popup__photos');


    title.textContent = offer.title;
    address.textContent = offer.address;
    price.textContent = offer.price + ' ₽/ночь';
    type.textContent = accommodationTypeEnToRu[offer.type];
    capacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    time.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    removeLiWithoutAnyFeature(offer.features, featuresItems);
    description.textContent = offer.description;
    avatar.src = advert.author.avatar;
    renderCardPhotos(card, offer.photos);

    var onCloseButtonClick = function () {
      card.remove();
    };

    var onCardKeydown = function (evt) {
      if (window.util.isEscapeKey(evt)) {
        card.remove();
      }
    };

    var removeEmptyBlock = function (data, element) {
      if (data.length === 0) {
        element.remove();
      }
    };

    removeEmptyBlock(offer.features, features);
    removeEmptyBlock(offer.photos, photos);

    document.body.addEventListener('keydown', onCardKeydown);
    closeButton.addEventListener('click', onCloseButtonClick);

    return card;

  };


})();
