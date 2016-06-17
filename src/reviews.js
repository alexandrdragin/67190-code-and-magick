'use strict';

(function() {

  var reviews = [];
  var filteredReviews = null;

  var pageSize = 3;
  var pageNumber = 0;

  var FILTER = {
    'ALL': 'reviews-all',
    'RECENT': 'reviews-recent',
    'GOOD': 'reviews-good',
    'BAD': 'reviews-bad',
    'POPULAR': 'reviews-popular'
  };


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

  getAllRewiews(function(loadedRewiews) {
    reviews = loadedRewiews;
    startFilters();
    setActiveFilter(FILTER.ALL);

    countAll();
  });

  var startFilters = function() {
    var filterElements = document.querySelector('.reviews-filter');
    filterElements.addEventListener('click', function(evt) {
      if (evt.target.name === 'reviews') {
        setActiveFilter(evt.target.id);
      }
    });

  };

  var setActiveFilter = function(filterID) {
    filteredReviews = getfilteredReviews(filterID);

    pageNumber = 0;

    renderReviews(filteredReviews, pageNumber);
  };

  var getfilteredReviews = function(filterID) {
    var list = reviews.slice(0);

    switch (filterID) {
      case FILTER.ALL:
        break;
      case FILTER.RECENT:
        var dateFour = new Date();
        dateFour.setDate(dateFour.getDate() - 4);

        list = list.filter(function(a) {
          return new Date(a.date).valueOf() > dateFour.valueOf();
        }).sort(function(a, b) {
          return a.date - b.date;
        });
        break;

      case FILTER.GOOD:
        list = list.filter(function(a) {
          return a.rating > 2;
        }).sort(function(a, b) {
          return b.rating - a.rating;
        });
        break;

      case FILTER.BAD:
        list = list.filter(function(a) {
          return a.rating < 3;
        }).sort(function(a, b) {
          return a.rating - b.rating;
        });
        break;

      case FILTER.POPULAR:
        list.sort(function(a, b) {
          return a.review_usefulness - b.review_usefulness;
        });
        break;
    }

    if (list.length === 0) {
      reviewFilter.querySelector('[value=' + filterID + ']').disabled = true;
    }

    return list;
  };

  var countAll = function() {
    addSupInFilters(getfilteredReviews(FILTER.ALL).length, FILTER.ALL);
    addSupInFilters(getfilteredReviews(FILTER.RECENT).length, FILTER.RECENT);
    addSupInFilters(getfilteredReviews(FILTER.GOOD).length, FILTER.GOOD);
    addSupInFilters(getfilteredReviews(FILTER.BAD).length, FILTER.BAD);
    addSupInFilters(getfilteredReviews(FILTER.POPULAR).length, FILTER.POPULAR);
  };

  var addSupInFilters = function(number, filterID) {
    var supTag = document.createElement('sub');
    supTag.textContent = ' ' + number;
    reviewFilter.querySelector('[for=' + filterID + ']').appendChild(supTag);
  };

  function checkMoreButton(number) {
    if ((pageNumber + 1) < Math.ceil(number / pageSize)) {
      reviewMoreButton.classList.remove('invisible');
    } else {
      reviewMoreButton.classList.add('invisible');
    }
  }

  reviewMoreButton.addEventListener('click', function() {
    renderReviews(filteredReviews, ++pageNumber, false);
  });

  var emptyReview = function() {
    var contentReview2 = reviewTemplate.content.querySelector('.empty-review');

    var emptyCopyCat = contentReview2.cloneNode(true);
    emptyCopyCat.querySelector('.empty-review__h2').textContent = 'соррян';
    emptyCopyCat.querySelector('.empty-review__text').textContent = 'сегодня пустовато';
    emptyCopyCat.querySelector('.empty-review__text').setAttribute('style', 'text-align: center;');

    reviewList.appendChild(emptyCopyCat);

  };

  reviewFilter.classList.remove('invisible');
})();
