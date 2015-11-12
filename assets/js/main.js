/**
 * main.js
 *
 * Author: Marian Friedmann
 *
 */

$(function() {

  var $modal = $('.js-modal'),
      $body = $('body'),
      $postIt = $('.js-post-it');

  var $form = $('.js-form'),
      $formSubmit = $('.js-form-submit'),
      $formError = $('.js-form-error');

  FastClick.attach(document.body);

  if (!$('html').hasClass('old-ie')) {
    $('.js-open-modal').click(function(e) {
      e.preventDefault();
      $body.addClass('no-scroll');
      $modal.addClass('modal--open');
      $postIt.addClass('post-it__content--hidden');
    });

    $('.js-close-modal').click(function(e) {
      e.preventDefault();
      $body.removeClass('no-scroll');
      $modal.removeClass('modal--open');
      $modal.removeClass('modal--success');
      $postIt.removeClass('post-it__content--hidden');
    });
  }

  $form.submit(function(e) {
    e.preventDefault();

    var formMail = $(this).find('input'),
        formMsg  = $(this).find('textarea');

    var formData = {
      mail: formMail.val(),
      message: formMsg.val()
    };

    var posting = $.post((document.location.hostname === 'mf.vc' ? 'http://mf.vc/new' : '../..') + '/mail.php', formData );

    $formSubmit.addClass('button--pulse-on');
    $formSubmit.attr('disabled', 'disabled');
    $formError.text('');

    posting.done(function( data ) {
      $formSubmit.removeClass('button--pulse-on');
      $formSubmit.attr('disabled', false);
      if (data == 'Mail sent successfully') {
        $modal.removeClass('modal--open');
        $modal.addClass('modal--success');
        setTimeout(function() {
          $formError.text('');
          formMail.val('');
          formMsg.val('');
        },300);

      } else {
        $formError.text(data);
        $form.removeClass('form--error');
        $modal.removeClass('modal--error');
        setTimeout(function() {
          $form.addClass('form--error');
          $modal.addClass('modal--error');
        }, 10);
      }
    });
  });
});
