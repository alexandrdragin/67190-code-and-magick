'use strict';

(function() {

  var reviews = [];

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

  var renderReviews = function(reviewsToGo) {
    reviewList.innerHTML = '';

    reviewsToGo.forEach(function(data) {
      createReviewElement(data, reviewList);
    });
  };

  getAllRewiews(function(loadedRewiews) {
    reviews = loadedRewiews;
    startFilters();
    renderReviews(reviews);
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
    renderReviews(filtredReviews);
  };

  var getFiltredReviews = function(filterID) {
    var list = reviews.slice(0);

    switch (filterID) {
      case 'reviews-recent':
        list.sort(function(a, b) {
          var firstDate = (new Date(a.view)).valueOf();
          var secondDate = (new Date(b.view)).valueOf();
          if (firstDate > secondDate) {
            return -1;
          }

          if (firstDate < secondDate || (secondDate && firstDate === 'undefined')) {
            return 1;
          }

          if (firstDate === firstDate) {
            return 0;
          }
        });

        break;

      case 'reviews-good':
        list = list.filter(function(a) {
          return a.rating > 3;
        });
        list.sort(function(a, b) {
          if (a.rating > b.rating) {
            return -1;
          }

          if (a.rating < b.rating || (b.rating && a.rating === 'undefined')) {
            return 1;
          }

          if (a.rating === b.rating) {
            return 0;
          }
        });

        break;

      case 'reviews-bad':
        list = list.filter(function(a) {
          return a.rating < 3;
        });
        list.sort(function(a, b) {
          if (a.rating > b.rating) {
            return 1;
          }

          if (a.rating < b.rating || (b.rating && a.rating === 'undefined')) {
            return -1;
          }

          if (a.rating === b.rating) {
            return 0;
          }
        });

        break;

      case 'reviews-popular':
        list.sort(function(a, b) {
          if (a['review-rating'] > b['review-rating'] || (b['review-rating'] && a['review-rating'] === 'undefined')) {
            return -1;
          }

          if (a['review-rating'] < b['review-rating']) {
            return 1;
          }

          if (a['review-rating'] === b['review-rating']) {
            return 0;
          }
        });

        break;
    }
    return list;
  };

  reviewFilter.classList.remove('invisible');

})();
