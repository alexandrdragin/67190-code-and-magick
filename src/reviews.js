'use strict';

(function() {

  var getJSONMetod = function(callback){
    var getJSON = function(path, nameFunction) {
      var scriptTagBody = document.createElement('script');
      scriptTagBody.textContent = 'var reviews = []; var ' + nameFunction + ' = function(data){reviews = data; callback(reviews);};';
      document.body.appendChild(scriptTagBody);

      var scriptTagLink = document.createElement('script');
      scriptTagLink.src = path;
      document.body.appendChild(scriptTagLink);
    };

    getJSON('https://up.htmlacademy.ru/assets/js_intensive/jsonp/reviews.js', '__reviewsLoadCallback');
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

  var loadedRewiewsCallback = function(reviewLists) {
    renderReviews(reviewLists);
  };

  getJSONMetod(loadedRewiewsCallback);

  reviewFilter.classList.remove('invisible');

})();
