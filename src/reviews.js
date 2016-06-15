'use strict';

(function() {

  var reviews = [];

  var pageSize = 3;
  var pageNumber = 0;

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

  var renderReviews = function(reviewsToGo, page) {
    if (reviewsToGo.length === 0) {
      reviewList.textContent = 'соррян, сегодня пустовато';
    } else {
      reviewList.innerHTML = '';
    }

    var from = page * pageSize;
    var to = from + pageSize;

    reviewsToGo.slice(from, to).forEach(function(data) {
      createReviewElement(data, reviewList);
    });
  };

  getAllRewiews(function(loadedRewiews) {
    reviews = loadedRewiews;
    startFilters();
    renderReviews(reviews, 0);
  });

  var startFilters = function() {
    var filterElements = document.querySelector('.reviews-filter');
    for(var i = 0; i < filterElements.length; i++) {
      filterElements[i].onclick = function(evt) {
        if (evt.target.name === 'reviews') {
          setActiveFilter(this.id);
        }
      };
    }
  };

  var setActiveFilter = function(filterID) {
    var filtredReviews = getFiltredReviews(filterID);
    renderReviews(filtredReviews, pageNumber);
  };

  var getFiltredReviews = function(filterID) {
    var list = reviews.slice(0);

    switch (filterID) {
      case 'reviews-all':
        break;
      case 'reviews-recent':
        var dateFour = new Date();
        dateFour.setDate(dateFour.getDate() - 4);

        list = list.filter(function(a) {
          return new Date(a.date).valueOf() > dateFour.valueOf();
        }).sort(function(a, b) {
          return a.date - b.date;
        });
        break;

      case 'reviews-good':
        list = list.filter(function(a) {
          return a.rating > 2;
        }).sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;

      case 'reviews-bad':
        list = list.filter(function(a) {
          return a.rating < 3;
        }).sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;

      case 'reviews-popular':
        list.sort(function(a, b) {
          return a.review_usefulness - b.review_usefulness;
        });
        break;
    }

    return list;
  };

  reviewFilter.classList.remove('invisible');

})();
