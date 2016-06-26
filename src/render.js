'use strict';

define(['./filter'], function(reviewsToGo, page) {

  var ratingClass = {
    '1': 'review-rating-one',
    '2': 'review-rating-two',
    '3': 'review-rating-three',
    '4': 'review-rating-four',
    '5': 'review-rating-five'
  };

  var pageSize = 3;
  var pageNumber = 0;

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

  var renderReviews = function(reviewsToGo, page, replace) {
    replace = typeof replace !== 'undefined' ? replace : true;

    if (replace) {
      reviewList.innerHTML = '';
    }

    if (reviewsToGo.length === 0) {
      emptyReview();
      return;
    }

    var from = page * pageSize;
    var to = from + pageSize;

    reviewsToGo.slice(from, to).forEach(function(data) {
      createReviewElement(data, reviewList);
    });

    checkMoreButton(reviewsToGo.length);
  };

  function checkMoreButton(number) {
    if ((pageNumber + 1) < Math.ceil(number / pageSize)) {
      reviewMoreButton.classList.remove('invisible');
    } else {
      reviewMoreButton.classList.add('invisible');
    }
  }

  var emptyReview = function() {
    var contentReview2 = reviewTemplate.content.querySelector('.empty-review');

    var emptyCopyCat = contentReview2.cloneNode(true);
    emptyCopyCat.querySelector('.empty-review__h2').textContent = 'соррян';
    emptyCopyCat.querySelector('.empty-review__text').textContent = 'сегодня пустовато';
    emptyCopyCat.querySelector('.empty-review__text').setAttribute('style', 'text-align: center;');

    reviewList.appendChild(emptyCopyCat);

  };

  reviewMoreButton.addEventListener('click', function() {
    renderReviews(filteredReviews, ++pageNumber, false);
  });

  reviewFilter.classList.remove('invisible');

  return createReviewElement;
})();
