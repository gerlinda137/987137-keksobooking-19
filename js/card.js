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


  var offerToSelectorAndRender = {
    title: {
      selector: '.popup__title',
      render: function (data, element) {
        element.textContent = data;
      }
    },
    address: {
      selector: '.popup__text--address',
      render: function (data, element) {
        element.textContent = data;
      }
    },
    price: {
      selector: '.popup__text--price',
      render: function (data, element) {
        element.textContent = data + ' ₽/ночь';
      }
    },
    type: {
      selector: '.popup__type',
      render: function (data, element) {
        element.textContent = accommodationTypeEnToRu[data];
      }
    },
    features: {
      selector: '.popup__features',
      render: function (data, element) {
        removeLiWithoutAnyFeature(data, element.querySelectorAll('li'));
      }
    },
    description: {
      selector: '.popup__description',
      render: function (data, element) {
        element.textContent = data;
      }
    },
  };

  var card = null;

  var onCloseButtonClick = function () {
    card.remove();
  };

  var onCardKeydown = function (evt) {
    if (window.util.isEscapeKey(evt)) {
      card.remove();
    }
  };

  var renderCard = function (advert) {
    var offer = advert.offer;
    card = cardTemplate.cloneNode(true);
    var capacity = card.querySelector('.popup__text--capacity');
    var time = card.querySelector('.popup__text--time');
    var avatar = card.querySelector('.popup__avatar');
    var closeButton = card.querySelector('.popup__close');
    var photos = card.querySelector('.popup__photos');

    var offerKeys = Object.keys(offerToSelectorAndRender);
    offerKeys.forEach(function (key) {
      var val = offerToSelectorAndRender[key];
      var element = card.querySelector(val.selector);
      if (offer[key]) {
        val.render(offer[key], element);
      } else {
        element.remove();
      }
    });

    if (offer.rooms || offer.quests) {
      capacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
    } else {
      capacity.remove();
    }

    if (offer.checkin || offer.checkout) {
      time.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
    } else {
      time.remove();
    }

    if (advert.author.avatar) {
      avatar.src = advert.author.avatar;
    } else {
      avatar.remove();
    }

    if (offer.photos) {
      renderCardPhotos(card, offer.photos);
    } else {
      photos.remove();
    }

    document.addEventListener('keydown', onCardKeydown);
    closeButton.addEventListener('click', onCloseButtonClick);


    return card;
  };

  var showCard = function (advert, map) {
    card = renderCard(advert);
    map.appendChild(card);
  };

  var removeCard = function () {
    if (card !== null) {
      card.remove();
      card = null;
    }
    document.body.removeEventListener('keydown', onCardKeydown);
  };

  window.card = {
    showCard: showCard,
    removeCard: removeCard,
  };

})();
