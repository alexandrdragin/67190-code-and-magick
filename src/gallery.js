'use strict';

define(function() {

  var Key = {
    'ESC': 27,
    'LEFT': 37,
    'RIGHT': 39
  };

  var galleryContainer = document.querySelector('.photogallery');
  //блок оверлея
  var overlayGallery = galleryContainer.querySelector('.overlay-gallery');
  // блок с номером фото
  var previewContainer = overlayGallery.querySelector('.overlay-gallery-preview');
  // кнопки
  var closeButtton = overlayGallery.querySelector('.overlay-gallery-close');
  var leftButton = overlayGallery.querySelector('.overlay-gallery-control-left');
  var rightButton = overlayGallery.querySelector('.overlay-gallery-control-right');

  var currentPhoto = 0;

    // привязывалка

  /**
     * Показывает фотогалерею, убирая у контейнера класс invisible. Затем добавляет
     * обработчики событий и показывает текущую фотографию.
     */
  var showGallery = function(img) {
    overlayGallery.classList.remove('invisible');
    closeButtton.addEventListener('click', onCloseClick());
    leftButton.addEventListener('click', onLeftButtonClick());
    rightButton.addEventListener('click', onRightButtonClick());
    document.body.addEventListener('keydown', onKeyDown());

    showPhoto(img);

  };

  /**
     * Наоборот, доб у контейнера класс invisible. Затем убирает
     * обработчики событий и обнуляет текущую фотографию.
     */
  var hideGallery = function() {
    overlayGallery.classList.add('invisible');

    closeButtton.removeEventListener('click', onCloseClick());
    leftButton.removeEventListener('click', onLeftButtonClick());
    this._rightButton.removeEventListener('click', onRightButtonClick());
    document.body.removeEventListener('keydown', onKeyDown());

    currentPhoto = 0;
  };

  /**этератор массива на обьекте (коллекции) с контекстом(1 аргумент) через функцию из протопипа
   * Записывает список фотографий.
   * @param {Array.<string>} photos
   */
  var setPhotos = function() {

    var images = document.querySelectorAll('.photogallery-image');
    var imageUrls = [];
    for (var i = 0; i < images.length; i++) {
      var videoData = images[i].dataset;
      var imagesNodes = images[i].querySelector('.photogallery-image img');
    }
  };

  var showPhoto = function(img) {
    overlayGallery.classList.remove('invisible');
    var index = this._photos.indexOf(img.getAttribute('src'));
    if (index !== -1) {
      this._currentPhoto = index;
    }

    showCurrentPhoto();
  };


  var showCurrentPhoto = function() {
    this._pictureElement.innerHTML = '';

    var imageArray = photos.at(currentPhoto);
    var imageElement;


    imageElement.render();
    previewContainer.appendChild(imageElement.el);

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
    setCurrentPhoto(currentPhoto - 1);
  };

  /**
   * Обработчик события клика по стрелке вправо.
   * @param {Event} evt
   * @private
   */
  var onRightButtonClick = function(evt) {
    evt.preventDefault();
    setCurrentPhoto(currentPhoto + 1);
  };

  /**
   * Обработчик клавиатурных событий. Прячет галерею при нажатии Esc
   * и переключает фотографии при нажатии на стрелки.
   * @param {Event} evt
   * @private
   */
  var onKeyDown = function(evt) {
    switch (evt.keyCode) {
      case Key.ESC:
        hideGallery();
        break;

      case Key.LEFT:
        setCurrentPhoto(currentPhoto - 1);
        break;

      case Key.RIGHT:
        setCurrentPhoto(currentPhoto + 1);
        break;
    }
  };

    /**
     * прокрутка по кругу
     * @param {number} index
     */
  var setCurrentPhoto = function(index) {
    if (index < 0) {
      index = 5;
    }

    if (index > 5) {
      index = 0;
    }

    if (currentPhoto === index) {
      return;
    }

    currentPhoto = index;
    showCurrentPhoto();
  };

  return showGallery;
});
