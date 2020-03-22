'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var BORDER_RADIUS = '5px';

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var previewAvatarDefaultSrc = previewAvatar.src;

  var fileChooserImages = document.querySelector('#images');
  var housingPicturePreview = document.querySelector('.housing-preview');

  // var housingPicturePreview = document.createElement('img');
  // previewImages.append(housingPicturePreview);
  // housingPicturePreview.width = housingPicturePreview.height = 70;

  var resetAvatar = function () {
    previewAvatar.src = previewAvatarDefaultSrc;
  };

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.classList.remove('visually-hidden');
        previewAvatar.src = reader.result;
        previewAvatar.style.borderRadius = BORDER_RADIUS;
      });

      reader.readAsDataURL(file);
    }
  });


  var resetHousingImage = function () {
    housingPicturePreview.classList.add('visually-hidden');
    housingPicturePreview.removeAttribute('src');
  };

  fileChooserImages.addEventListener('change', function () {
    var file = fileChooserImages.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        housingPicturePreview.classList.remove('visually-hidden');
        housingPicturePreview.src = reader.result;
        housingPicturePreview.style.borderRadius = BORDER_RADIUS;
      });

      reader.readAsDataURL(file);
    }
  });

  var resetAllImages = function () {
    resetAvatar();
    resetHousingImage();
  };

  window.photos = {
    resetAllImages: resetAllImages,
  };

})();
