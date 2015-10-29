/**
 * main.js
 *
 * Author: Marian Friedmann
 *
 */

$(function() {




  $('.open-modal').click(function(e) {
    e.preventDefault();
    $('.modal').addClass('modal--open');
    $('.post-it').addClass('post-it--hidden');
  });

  $('.close-modal').click(function(e) {
    e.preventDefault();
    $('.modal').removeClass('modal--open');
    $('.post-it').removeClass('post-it--hidden');
  });
});
