'use strict';

var getAllRewiews = function(callback) {
  var xhr = new XMLHttpRequest();

  xhr.open('get', 'https://o0.github.io/assets/json/reviews.json');

  xhr.onloadstart = function() {
    document.querySelector('.reviews').classList.add('reviews-list-loading');
  };

  xhr.onload = function(e) {
    var loadedData = JSON.parse(e.target.response);
    callback(loadedData);
    document.querySelector('.reviews').classList.remove('reviews-list-loading');
    document.querySelector('.reviews').classList.remove('reviews-load-failure');
  };

  xhr.send();

};

module.exports = getAllRewiews;
