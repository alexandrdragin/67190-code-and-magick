'use strict';

(function() {
  var loadedPhotos,
    photos = [];

  /**
   *
   * @param  {Object} data
   * @return {Object}
   */
  var getPhotos = function(data) {
    loadedPhotos = data;
    for (var i = 0; i < loadedPhotos.length; i++) {
      photos.push(loadedPhotos[i].src);
    }
    return photos;
  };

  module.exports = getPhotos;
})();
