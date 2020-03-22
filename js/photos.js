'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var BORDER_RADIUS = '5px';

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var previewAvatarDefaultSrc = previewAvatar.src;

  var fileChooserHousing = document.querySelector('#images');
  var previewHousing = document.querySelector('.housing-preview');

  var subscribeImageChooser = function (fileChooser, previewImage) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          previewImage.classList.remove('visually-hidden');
          previewImage.src = reader.result;
          previewImage.style.borderRadius = BORDER_RADIUS;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var resetAvatar = function () {
    previewAvatar.src = previewAvatarDefaultSrc;
  };

  var resetHousingImage = function () {
    previewHousing.classList.add('visually-hidden');
    previewHousing.src = '';
  };

  var resetAllImages = function () {
    resetAvatar();
    resetHousingImage();
  };

  subscribeImageChooser(fileChooserAvatar, previewAvatar);
  subscribeImageChooser(fileChooserHousing, previewHousing);

  window.photos = {
    resetAllImages: resetAllImages,
  };

})();
