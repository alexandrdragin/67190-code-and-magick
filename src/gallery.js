'use strict';

var get = require('./gallery-get');
var showPhoto = require('./gallery-show');

var Key = {
  'ESC': 27,
  'LEFT': 37,
  'RIGHT': 39
};


var galleryContainer = document.querySelector('.photogallery');
var photos = galleryContainer.querySelectorAll('.photogallery-image img');

var overlayGallery = document.querySelector('.overlay-gallery');



var closeButtton = overlayGallery.querySelector('.overlay-gallery-close');
var leftButton = overlayGallery.querySelector('.overlay-gallery-control-left');
var rightButton = overlayGallery.querySelector('.overlay-gallery-control-right');

var galleryPics = get(photos);

overlayGallery.querySelector('.preview-number-total').textContent = galleryPics.length;
var currentNumber = overlayGallery.querySelector('.preview-number-current');

var currentPhoto = 0;


galleryContainer.addEventListener('click', function(evt) {
  evt.preventDefault();

  if (evt.target.src) {
    for (var i = 0; i < galleryPics.length; i++) {
      if (galleryPics[i] === evt.target.src) {
        currentNumber.textContent = i + 1;
        currentPhoto = i;

        showGallery(i);
      }
    }
  }
});

/**
   * Показывает фотогалерею, убирая у контейнера класс invisible. Затем добавляет
   * обработчики событий и показывает текущую фотографию.
   */
var showGallery = function(imgNumbr) {
  overlayGallery.classList.remove('invisible');

  closeButtton.addEventListener('click', onCloseClick);
  leftButton.addEventListener('click', onLeftButtonClick);
  rightButton.addEventListener('click', onRightButtonClick);
  document.addEventListener('keydown', onKeyDown);

  showPhoto(galleryPics[imgNumbr]);
};

/**
   * Наоборот, доб у контейнера класс invisible. Затем убирает
   * обработчики событий и обнуляет текущую фотографию.
   */
var hideGallery = function() {
  overlayGallery.classList.add('invisible');

  closeButtton.removeEventListener('click', onCloseClick);
  leftButton.removeEventListener('click', onLeftButtonClick);
  rightButton.removeEventListener('click', onRightButtonClick);
  document.removeEventListener('keydown', onKeyDown);

  currentPhoto = 0;
};

/**
 * Обработчик события клика по крестику закрытия. Вызывает метод hide.
 * @param {Event} evt
 * @private
 */
var onCloseClick = function(evt) {
  evt.preventDefault();
  hideGallery();
};

/**
 * Обработчик события клика по стрелке влево.
 * @param {Event} evt
 * @private
 */
var onLeftButtonClick = function(evt) {
  evt.preventDefault();
  if(currentPhoto > 0) {
    setCurrentPhoto(-1);
  }
};

/**
 * Обработчик события клика по стрелке вправо.
 * @param {Event} evt
 * @private
 */
var onRightButtonClick = function(evt) {
  evt.preventDefault();
  if(currentPhoto < galleryPics.length - 1) {
    setCurrentPhoto(1);
  }
};

/**
 * Обработчик клавиатурных событий. Прячет галерею при нажатии Esc
 * и переключает фотографии при нажатии на стрелки.
 * @param {Event} evt
 * @private
 */
var onKeyDown = function(evt) {
  evt.preventDefault();

  switch (evt.keyCode) {

    case Key.ESC:
      hideGallery();
      break;

    case Key.LEFT:
      if(currentPhoto > 0) {
        setCurrentPhoto(-1);
      }
      break;

    case Key.RIGHT:
      if(currentPhoto < galleryPics.length - 1) {
        setCurrentPhoto(1);
      }
      break;
  }
};

  /**
   * прокрутка по кругу
   * @param {number} index
   */
var setCurrentPhoto = function(i) {
  currentPhoto = currentPhoto + i;
  showPhoto(galleryPics[currentPhoto]);
  currentNumber.textContent = currentPhoto + 1;
};
