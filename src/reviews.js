'use strict';

(function() {

  var ratingClass = {
    '1': 'review-rating-one',
    '2': 'review-rating-two',
    '3': 'review-rating-three',
    '4': 'review-rating-four',
    '5': 'review-rating-five'
  };

  var reviewFilter = document.querySelector('.reviews-filter');
  reviewFilter.classList.add('invisible');

  var reviewMoreButton = document.querySelector('.reviews-controls-more');
  reviewMoreButton.classList.remove('invisible');

  var reviewTemplate = document.querySelector('#review-template');
  var reviewList = document.querySelector('.reviews-list');
  var contentReview = null;

  if ('content' in reviewTemplate) {
    contentReview = reviewTemplate.content.querySelector('.review');
  } else {
    contentReview = reviewTemplate.querySelector('.review');
  }

  var getAllRewiews = function(callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function(e) {
      var loadedData = JSON.parse(e.target.response);
      callback(loadedData);
      document.querySelector('.reviews').classList.add('reviews-list-loading');
    };

    xhr.open('get', 'https://o0.github.io/assets/json/reviews.json');
    xhr.send();
  };

  var createReviewElement = function(data, container) {
    var copyCat = contentReview.cloneNode(true);
    copyCat.querySelector('.review-author').title = data.author['name'];
    copyCat.querySelector('.review-author').alt = data.author['name'];
    copyCat.querySelector('.review-rating').classList.add(ratingClass[data.rating]);
    copyCat.querySelector('.review-text').textContent = data.description;

    container.appendChild(copyCat);

    var imgAuthor = new Image(124, 124);

    imgAuthor.onload = function() {
      copyCat.querySelector('.review-author').src = data.author['picture'];
      copyCat.querySelector('.review-author').width = 124;
      copyCat.querySelector('.review-author').height = 124;
    };

    imgAuthor.onerror = function() {
      copyCat.classList.add('review-load-failure');
    };

    imgAuthor.src = data.author['picture'];

    return copyCat;
  };

  var renderReviews = function(reviews) {
    reviews.forEach(function(data) {
      createReviewElement(data, reviewList);
    });
  };

  getAllRewiews(function(loadedRewiews) {
    var reviews = loadedRewiews;
    renderReviews(reviews);
  });

  reviewFilter.classList.remove('invisible');

})();
