'use strict';


var Gallery = require('./gallery-obj');

var galleryContainer = document.querySelector('.photogallery');
var photos = galleryContainer.querySelectorAll('.photogallery-image img');

var overlayGallery = document.querySelector('.overlay-gallery');

var currentNumber = overlayGallery.querySelector('.preview-number-current');



galleryContainer.addEventListener('click', function(evt) {
  evt.preventDefault();

  if (evt.target.src) {

    var galleryPics = getPhotos(photos);

    var getPhotos = function(data) {
      var loadedPhotos = data;
      for (var i = 0; i < loadedPhotos.length; i++) {
        galleryPics.push(loadedPhotos[i].src);
      }

      overlayGallery.querySelector('.preview-number-total').textContent = this.photos.length;
      return galleryPics;
    };

    for (var i = 0; i < galleryPics.length; i++) {
      if (galleryPics[i] === evt.target.src) {
        currentNumber.textContent = i + 1;

        Gallery.showGallery(i);
      }
    }
  }

  galleryPics();

});

module.exports = new Gallery(galleryContainer, photos, overlayGallery);
