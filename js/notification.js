'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityList = adForm.querySelectorAll('#capacity option');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var inputs = adForm.querySelectorAll('input, select, fieldset');
  var addressInput = adForm.querySelector('#address');

  var roomToCapacity = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

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
  validateRoomsAndCapacity();

  window.mainPin.setOnChange(function (coords) {
    addressInput.value = coords.x + ', ' + coords.y;
  });

  var onReset = null;

  resetButton.addEventListener('click', function () {
    if (window.util.isFunction(onReset)) {
      onReset();
    }
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
      validateRoomsAndCapacity();
    },
    setOnReset: function (callback) {
      onReset = callback;
    },
  };

})();
