'use strict';

var cookies = require('browser-cookies');

(function() {

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var reviewForm = document.querySelector('.review-form');
  var reviewName = document.getElementById('review-name');
  var reviewText = document.getElementById('review-text');

  var reviewScoreValueClick = reviewForm.querySelectorAll('input[name="review-mark"]');

  var submitButton = reviewForm.querySelector('.review-submit');

  var reviewScore = cookies.get('radioValue');
  if (reviewScore) {
    var selectedRadio = reviewForm.querySelector('input[name="review-mark"][value="' + reviewScore + '"]');
    selectedRadio.setAttribute('checked', true);
  }

  reviewName.value = cookies.get('reviewName');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  reviewName.required = true;
  reviewText.required = true;
  submitButton.disabled = true;

  function checkValues() {

    var reviewNameLabel = reviewForm.getElementsByClassName('review-fields-name')[0];
    if (reviewName.value.length) {
      reviewNameLabel.classList.add('invisible');
      submitButton.disabled = true;
    } else {
      reviewNameLabel.classList.remove('invisible');
    }

    var reviewFieldsText = reviewForm.getElementsByClassName('review-fields-text')[0];
    if (reviewText.value.length) {
      reviewFieldsText.classList.add('invisible');
    } else {
      reviewFieldsText.classList.remove('invisible');
    }

    var reviewScoreValue = reviewForm.querySelector('input[name="review-mark"]:checked').value;
    if(reviewScoreValue > 2 || reviewText.value.length) {

      reviewText.required = false;
      reviewFieldsText.classList.add('invisible');
    } else {
      reviewFieldsText.classList.remove('invisible');
      reviewText.required = true;
      submitButton.disabled = true;
    }

    if(reviewName.value.length && (reviewScoreValue > 2 || reviewText.value.length)) {
      submitButton.disabled = false;
    }

    if(!reviewName.validity.valid) {
      reviewName.placeholder = reviewName.validationMessage;
    }

    if(reviewText.validity.valid) {
      reviewText.placeholder = 'при оценке выше 3х отзыв не обязателен';
    } else {
      reviewText.placeholder = reviewText.validationMessage;
    }
  }

  reviewName.onkeyup = function() {
    checkValues();
  };

  reviewText.onkeyup = function() {
    checkValues();
  };

  for (var i = 0; i < reviewScoreValueClick.length; i++) {
    reviewScoreValueClick[i].onclick = function() {
      checkValues();
    };
  }

  reviewForm.onsubmit = function() {
    checkValues();

    var now = new Date();

    var nowYear = now.getFullYear();
    var MY_BD_THISYEAR = new Date(nowYear, 7, 14, 0, 0, 0);
    var expiresDate = null;

    // если прошел
    if (now > MY_BD_THISYEAR) {
      expiresDate = (+now - MY_BD_THISYEAR);
    } else {
    // если еще небыло то запивваем количесво дней с начала года + с 14.08 до конца прошлого
      var NUMBER_OF_DAYS_SINCE_THIS_YEAR = +now - (new Date(nowYear, 0, 1, 0, 0, 0));
      // 156
      var NUMBER_OF_DAYS_LAST_YEAR = (new Date(nowYear - 1, 11, 31, 0, 0, 0)) - (new Date(nowYear - 1, 7, 14, 0, 0, 0));
      // ~139 дней
      expiresDate = NUMBER_OF_DAYS_SINCE_THIS_YEAR + NUMBER_OF_DAYS_LAST_YEAR;
    }

    reviewScore = reviewForm.querySelector('input[name="review-mark"]:checked');
    var expiresDateDAYS = expiresDate / 24 / 60 / 60 / 1000;

    cookies.set('radioValue', reviewScore.value, 'expires', {expires: expiresDateDAYS});
    cookies.set('reviewName', reviewName.value, 'expires', {expires: expiresDateDAYS});

    reviewForm.submit();
  };

})();
