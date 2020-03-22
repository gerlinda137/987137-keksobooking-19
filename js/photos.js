'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview');

  var fileChooserHousing = document.querySelector('#images');
  var previewHousing = document.querySelector('.ad-form__photo');

  var cleanImageForm = function (previewElement) {
    previewElement.querySelectorAll('img').forEach(window.util.removeElement);
  };

  var resetImageForm = function () {
    cleanImageForm(previewAvatar);
    cleanImageForm(previewHousing);
  };

  var updatePreviewImage = function (fileInputElement, previewContainerElement) {
    var file = fileInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (!matches) {
      return;
    }

    cleanImageForm(previewContainerElement);
    // previewContainerElement.querySelectorAll('img').forEach(window.util.removeElement);

    var previewImg = document.createElement('img');
    previewContainerElement.append(previewImg);
    // previewContainerElement.style.padding = 0;
    previewImg.width = 70;
    previewImg.height = 70;
    previewImg.style.borderRadius = '5px';

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      previewImg.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  var onAvatarFileChooserChange = function () {
    updatePreviewImage(fileChooserAvatar, previewAvatar);
  };

  fileChooserAvatar.addEventListener('change', onAvatarFileChooserChange);

  var onHousingFileChooserChange = function () {
    updatePreviewImage(fileChooserHousing, previewHousing);
  };

  fileChooserHousing.addEventListener('change', onHousingFileChooserChange);

  window.photos = {
    resetImageForm: resetImageForm,
  };

})();
