'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  var reviewForm = document.querySelector('.review-form');
  var reviewName = document.getElementById('review-name');
  var reviewText = document.getElementById('review-text');

  var reviewScoreValueClick = reviewForm.querySelectorAll('input[name="review-mark"]');

  var submitButton = reviewForm.querySelector('.review-submit');

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
      submitButton.disabled = true;
    }

    if(reviewName.value.length && (reviewScoreValue > 2 || reviewText.value.length)) {
      submitButton.disabled = false;
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

})();
