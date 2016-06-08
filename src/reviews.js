'use strict';

(function() {

  var reviewFilter = document.querySelector('.reviews-filter');
  reviewFilter.classList.add('invisible');

  var reviewMoreButton = document.querySelector('.reviews-controls-more');
  reviewMoreButton.classList.remove('invisible');

  var reviewTemplate = document.querySelector('#review-template');
  var reviewList = document.querySelector('.reviews-list');
  var contentReview = null;

  var requestFailureTimeout = 10000;

  if ('content' in reviewTemplate) {
    contentReview = reviewTemplate.content.querySelector('.review');
  } else {
    contentReview = reviewTemplate.querySelector('.review');
  }

  var createReviewElement = function(data, container) {
    var copyCat = contentReview.cloneNode(true);
    copyCat.querySelector('.review-author').title = data.author['name'];
    copyCat.querySelector('.review-author').alt = data.author['name'];
    copyCat.querySelector('.review-rating').textContent = data.rating;
    copyCat.querySelector('.review-rating').classList.add(data.rating);
    copyCat.querySelector('.review-text').textContent = data.description;

    container.appendChild(copyCat);
    return copyCat;
  };

  window.reviews.forEach(function(data) {
    createReviewElement(data, reviewList);
  });

/*  "author": {
        "name": "Иванов Иван",
        "picture": "img/user-1.jpg"
      },
      "date": "2016-01-12",
      "review_usefulness": 10,
      "rating": 2,
      "description": */


  reviewForm.classList.remove('invisible');

})();
