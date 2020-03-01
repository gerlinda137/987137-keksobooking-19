'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityList = adForm.querySelectorAll('#capacity option');

  var roomToCapacity = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var validateRoomsAndCapacity = function () {
    var options = roomToCapacity[roomNumber.value];

    var firstSelectedIndex = -1;

    capacityList.forEach(function (option, i) {
      var enabled = options.includes(option.value);
      option.disabled = !enabled;

      if (enabled && firstSelectedIndex === -1) {
        firstSelectedIndex = i;
      }
    });

    if (firstSelectedIndex !== -1) {
      capacity.selectedIndex = firstSelectedIndex;
    }
  };

  var onRoomNumberChange = function () {
    validateRoomsAndCapacity();
  };

  roomNumber.addEventListener('change', onRoomNumberChange);
  validateRoomsAndCapacity();

  var addressInput = adForm.querySelector('#address');
  addressInput.value = window.map.getCenterPinAddress();

  var changeAddressValue = function () {
    addressInput.value = window.map.getPinAddress();
  };

  var inputs = adForm.querySelectorAll('input, select, fieldset');

  window.advertForm = {
    addressInput: addressInput,
    changeAddressValue: changeAddressValue,
    enable: function () {
      inputs.forEach(window.util.unsetDisabled);
      adForm.classList.remove('ad-form--disabled');
    },
  };
})();
