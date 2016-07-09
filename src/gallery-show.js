'use strict';

(function() {
  var picturePreview = new Image();
  var previewContainer = document.querySelector('.overlay-gallery-preview');

  var showPhoto = function(img) {
    picturePreview.innerHTML = '';

    picturePreview.classList.add('overlay-gallery-preview-photo');
    picturePreview.src = img;

    previewContainer.appendChild(picturePreview);
  };

  module.exports = showPhoto;
})();
