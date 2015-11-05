/**
 * main.js
 *
 * Author: Marian Friedmann
 *
 */

$(function() {




  $('.js-open-modal').click(function(e) {
    e.preventDefault();
    $('.js-modal').addClass('modal--open');
    $('body').addClass('no-scroll');
    $('.js-post-it').addClass('post-it--hidden');
  });

  $('.js-close-modal').click(function(e) {
    e.preventDefault();
    $('.js-modal').removeClass('modal--open');
    $('body').removeClass('no-scroll');
    $('.js-post-it').removeClass('post-it--hidden');
  });

  $('.js-form').submit(function(e) {
    e.preventDefault();

    var formMail = $(this).find('input'),
        formMsg  = $(this).find('textarea');

    var formData = {
      mail: formMail.val(),
      message: formMsg.val()
    };

    var posting = $.post( '../../mail.php', formData );

    posting.done(function( data ) {
      if (data == 'Mail sent successfully') {
        $('.js-modal').removeClass('modal--open');
        $('.js-post-it').removeClass('post-it--hidden');
        setTimeout(function() {
          $('.js-form-error').text('');
          formMail.val('');
          formMsg.val('');
        },300);
      } else {
        $('.js-form-error').text(data);
        $('.js-form').removeClass('form--error');
        $('.js-modal').removeClass('modal--error');
        setTimeout(function() {
          $('.js-form').addClass('form--error');
          $('.js-modal').addClass('modal--error');
        }, 10);
      }
    });
  });
});
