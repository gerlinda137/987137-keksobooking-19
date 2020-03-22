'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooserAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var fileChooserImages = document.querySelector('#images');
  var previewImages = document.querySelector('.ad-form__photo');


  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    // var avatarPreview = document.createElement('img');
    // previewAvatar.append(avatarPreview);
    previewAvatar.width = 70;
    previewAvatar.height = 70;
    previewAvatar.style.borderRadius = '5px';


    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  fileChooserImages.addEventListener('change', function () {
    var file = fileChooserImages.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    var picturePreview = document.createElement('img');
    previewImages.append(picturePreview);
    picturePreview.width = 70;
    picturePreview.height = 70;
    picturePreview.style.borderRadius = '5px';


    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        picturePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

})();
