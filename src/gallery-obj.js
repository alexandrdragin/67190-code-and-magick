'use strict';

(function() {

  var Key = {
    'ESC': 27,
    'LEFT': 37,
    'RIGHT': 39,
    'SPACE': 32
  };

  var overlayGallery = document.querySelector('.overlay-gallery');
  var currentNumber = overlayGallery.querySelector('.preview-number-current');

  var currentPhoto = 0;

  var Gallery = function(container, photos, overlay) {
    this.container = container;
    this.photos = [];
    this.overlay = overlay;

    this.getElements();
    this.getPhotos(photos);
    this.createPhoto();
    this.bindEvents();

    this.container.addEventListener('click', this._onContainerClick);
  };


  Gallery.prototype = {

    searchElements: function() {

      this.closeButtton = overlayGallery.querySelector('.overlay-gallery-close');
      this.leftButton = overlayGallery.querySelector('.overlay-gallery-control-left');
      this.rightButton = overlayGallery.querySelector('.overlay-gallery-control-right');

      this.currentNumber = overlayGallery.querySelector('.preview-number-current');
    },

    showGallery: function(imgNumbr) {
      overlayGallery.classList.remove('invisible');

      this.closeButtton.addEventListener('click', this.onCloseClick);
      this.leftButton.addEventListener('click', this.onLeftButtonClick);
      this.rightButton.addEventListener('click', this.onRightButtonClick);
      document.addEventListener('keydown', this.onKeyDown);

      this.showPhoto(this.photos[imgNumbr]);
    },

    hideGallery: function() {
      overlayGallery.classList.add('invisible');

      this.closeButtton.removeEventListener('click', this.onCloseClick);
      this.leftButton.removeEventListener('click', this.onLeftButtonClick);
      this.rightButton.removeEventListener('click', this.onRightButtonClick);
      document.removeEventListener('keydown', this.onKeyDown);

      currentPhoto = 0;
    },

    onCloseClick: function(evt) {
      evt.preventDefault();
      this.hideGallery();
    },

    onLeftButtonClick: function(evt) {
      evt.preventDefault();
      if(currentPhoto > 0) {
        this.setCurrentPhoto(-1);
      }
    },

    onRightButtonClick: function(evt) {
      evt.preventDefault();
      if(currentPhoto < this.photos.length - 1) {
        this.setCurrentPhoto(1);
      }
    },

    onKeyDown: function(evt) {
      evt.preventDefault();

      switch (evt.keyCode) {

        case Key.ESC:
          this.hideGallery();
          break;

        case Key.LEFT :
          if(currentPhoto > 0) {
            this.setCurrentPhoto(-1);
          }
          break;

        case Key.RIGHT || Key.SPACE:
          if(currentPhoto < this.photos.length - 1) {
            this.setCurrentPhoto(1);
          }
          break;
      }
    },

    setCurrentPhoto: function(i) {
      currentPhoto = currentPhoto + i;
      this.showPhoto(this.photos[currentPhoto]);
      currentNumber.textContent = currentPhoto + 1;
    }

  };


  module.exports = Gallery;
})();
