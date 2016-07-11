'use strict';

var getAllRewiews = require('./load');
var Review = require('./render');

var reviews = [];
var filteredReviews = null;

var pageSize = 3;
var pageNumber = 0;

var Filter = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};

var reviewFilter = document.querySelector('.reviews-filter');
reviewFilter.classList.add('invisible');

var reviewMoreButton = document.querySelector('.reviews-controls-more');
reviewMoreButton.classList.remove('invisible');

var reviewTemplate = document.querySelector('#review-template');
var reviewList = document.querySelector('.reviews-list');

var renderReviews = function(reviewsToGo, page, replace) {
  replace = typeof replace !== 'undefined' ? replace : true;

  if (replace) {
    reviewList.innerHTML = '';

    reviews.forEach(function() {
      Review.remove();
    });

    reviews = [];
  }

  if (reviewsToGo.length === 0) {
    emptyReview();
    return;
  }

  var from = page * pageSize;
  var to = from + pageSize;

  reviewsToGo.slice(from, to).forEach(function(data) {
    reviews.push(new Review(data, reviewList));
  });

  checkMoreButton(reviewsToGo.length);
};

getAllRewiews(function(loadedRewiews) {
  reviews = loadedRewiews;
  startFilters();
  setActiveFilter(Filter.ALL);

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
    case Filter.ALL:
      break;
    case Filter.RECENT:
      var dateFour = new Date();
      dateFour.setDate(dateFour.getDate() - 4);

      list = list.filter(function(a) {
        return new Date(a.date).valueOf() > dateFour.valueOf();
      }).sort(function(a, b) {
        return a.date - b.date;
      });
      break;

    case Filter.GOOD:
      list = list.filter(function(a) {
        return a.rating > 2;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;

    case Filter.BAD:
      list = list.filter(function(a) {
        return a.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;

    case Filter.POPULAR:
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
  addSupInFilters(getfilteredReviews(Filter.ALL).length, Filter.ALL);
  addSupInFilters(getfilteredReviews(Filter.RECENT).length, Filter.RECENT);
  addSupInFilters(getfilteredReviews(Filter.GOOD).length, Filter.GOOD);
  addSupInFilters(getfilteredReviews(Filter.BAD).length, Filter.BAD);
  addSupInFilters(getfilteredReviews(Filter.POPULAR).length, Filter.POPULAR);
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
