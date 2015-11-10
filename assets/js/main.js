/**
 * main.js
 *
 * Author: Marian Friedmann
 *
 */

$(function() {

  $('body').removeClass('no-show');



  $('.js-open-modal').click(function(e) {
    e.preventDefault();
    $('.js-modal').addClass('modal--open');
    $('.js-post-it').addClass('post-it__content--hidden');
  });
  FastClick.attach(document.body);

  $('.js-close-modal').click(function(e) {
    e.preventDefault();
    $('.js-modal').removeClass('modal--open');
    $('.js-modal').removeClass('modal--success');
    $('.js-post-it').removeClass('post-it__content--hidden');
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

    $('.js-form-submit').addClass('button--pulse-on');
    $('.js-form-submit').attr('disabled', 'disabled');
    $('.js-form-error').text('');

    posting.done(function( data ) {
      $('.js-form-submit').removeClass('button--pulse-on');
      $('.js-form-submit').attr('disabled', false);
      if (data == 'Mail sent successfully') {
        $('.js-modal').removeClass('modal--open');
        $('.js-modal').addClass('modal--success');
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
