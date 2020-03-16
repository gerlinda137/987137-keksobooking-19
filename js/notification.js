'use strict';

(function () {
  var roomToCapacity = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var accommodationToMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityList = adForm.querySelectorAll('#capacity option');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var inputs = adForm.querySelectorAll('input, select, fieldset');
  var addressInput = adForm.querySelector('#address');
  var filterInputTimeIn = adForm.querySelector('#timein');
  var filterInputTimeOut = adForm.querySelector('#timeout');
  var filterInputType = adForm.querySelector('#type');
  var filterInputPrice = adForm.querySelector('#price');

  var capacityToIndex = {};
  capacityList.forEach(function (option) {
    capacityToIndex[option.value] = option.index;
  });

  var validateRoomsAndCapacity = function () {
    var options = roomToCapacity[roomNumber.value];

    if (!options.includes(capacity.value)) {
      capacity.selectedIndex = capacityToIndex[options[0]];
    }

    capacityList.forEach(function (option) {
      option.disabled = !options.includes(option.value);
    });
  };

  var onRoomNumberChange = function () {
    validateRoomsAndCapacity();
  };

  roomNumber.addEventListener('change', onRoomNumberChange);

  window.mainPin.setOnChange(function (coords) {
    addressInput.value = coords.x + ', ' + coords.y;
  });

  var onReset = null;

  var callOnReset = function () {
    if (window.util.isFunction(onReset)) {
      onReset();
    }
  };

  resetButton.addEventListener('click', function () {
    callOnReset();
  });


  var syncSelectOptions = function (elementSyncedWith, syncedElement) {
    elementSyncedWith.addEventListener('change', function () {
      var inFilterValue = elementSyncedWith.options[elementSyncedWith.selectedIndex].value;
      for (var i = 0; i < syncedElement.options.length; i++) {
        if (inFilterValue === syncedElement.options[i].value) {
          syncedElement.selectedIndex = i;
          break;
        }
      }
    });
  };

  syncSelectOptions(filterInputTimeIn, filterInputTimeOut);
  syncSelectOptions(filterInputTimeOut, filterInputTimeIn);

  var onFilterInputTypeChange = function () {
    var minPrice = accommodationToMinPrice[filterInputType.value];

    filterInputPrice.min = minPrice;
    filterInputPrice.placeholder = minPrice;
  };

  filterInputType.addEventListener('change', onFilterInputTypeChange);

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), function () {
      callOnReset();
      var successMessageTemplate = document.querySelector('#success').content;
      var successMessage = successMessageTemplate.cloneNode(true);
      document.body.appendChild(successMessage);

      var successMessageDiv = document.querySelector('.success');
      var onSuccessMessagePress = function (evt1) {
        if (window.util.isMainMouseButton(evt1) || window.util.isEscKey(evt1)) {
          successMessageDiv.remove();
        }
      };

      successMessageDiv.addEventListener('click', onSuccessMessagePress);
      document.body.addEventListener('keydown', onSuccessMessagePress);
      successMessageDiv.focus();
    });
    evt.preventDefault();
  });


  window.notification = {
    enable: function () {
      inputs.forEach(window.util.unsetDisabled);
      adForm.classList.remove('ad-form--disabled');
    },
    disable: function () {
      inputs.forEach(window.util.setDisabled);
      adForm.classList.add('ad-form--disabled');
      adForm.reset();
    },
    setOnReset: function (callback) {
      onReset = callback;
    },
  };

})();
