'use strict';

var renderGet = require('./render-get');

var Review = function(data, container) {
  this.data = data;
  this.element = renderGet(this.data, container);

  this.bindEvents();

  this.element.parentNode.appendChild(this.element);
};

Review.prototype = {

  remove: function() {
    this.unbindEvents();
    this.element.parentNode.removeChild(this.element);
  },

  bindEvents: function() {
    this.element.addEventListener('click', this.onClick);
  },
  unbindEvents: function() {
    this.element.removeEventListener('click', this.onClick);
  }
};

module.exports = Review;
