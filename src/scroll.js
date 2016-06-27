'use strict';

define(['./game'], function(Game) {

  var headerClouds = document.querySelector('.header-clouds');
  var seeClouds = true;

  var trottleDelay = 100;

  function initScroll() {
    window.addEventListener('scroll', function() {
      trottle(checkVisbility(), trottleDelay);
      moveClouds();
    });
  }

  function moveClouds() {
    if (seeClouds) {
      console.log('seeClouds');
      var num = window.pageYOffset;
      headerClouds.style.top = num / 4 + 0 + 'px';
      headerClouds.style.backgroundPosition = num / 3 + 0 + 'px';
    }
  }

  var checkVisbility = function() {
    console.log('checkVisbility');
    if (window.pageYOffset < 300) {
      seeClouds = true;
      Game.setGameStatus(Game.Verdict.CONTINUE);
    } else {
      seeClouds = false;
      Game.setGameStatus(Game.Verdict.PAUSE);
    }
  };

  var trottle = function(funct, time) {
    var lastCall = Date.now();

    var createFunct = function() {
      if (Date.now() - lastCall >= time) {
        funct();
      }
      lastCall = Date.now();
    };
    return createFunct();
  };

  initScroll();

  return Game;

});
