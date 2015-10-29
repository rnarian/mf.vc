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

  $('form').submit(function(e) {
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
        $('.modal').removeClass('modal--open');
        $('.post-it').removeClass('post-it--hidden');
        setTimeout(function() {
          $('.js-form-error').text('');
          formMail.val('');
          formMsg.val('');
        },300);
      } else {
        $('.js-form-error').text(data);
        $('.form').removeClass('error');
        setTimeout(function() {
          $('.form').addClass('error');
        }, 10);
      }
    });
  });
});
