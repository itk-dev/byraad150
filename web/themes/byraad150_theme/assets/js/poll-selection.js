/* eslint-env jquery */
(function ($) {
  Drupal.behaviors.pollSelection = {
    attach: function (context, settings) {

      // Act on poll selection.
      $('.js-poll-select').click(function () {
        if ($(this).hasClass('is-locked')) {
          // Action to take if poll is locked.
        }
        else {
          // Remove all instances of is-active.
          $('.js-poll-select').removeClass('is-active');

          // Add is-active to selected element.
          $(this).addClass('is-active');
          // Get radio button id through matching label/Brick title.
          var entity_id = $(this).data('entity-id');
          var radioId = $('.js-poll .option').filter(function () {
            return ($(this).text() == entity_id)
          }).attr('for');

          // Set checked on radio button match.
          $('#' + radioId).prop('checked', true);
        }
      });

      $(document).ready(function () {
        // Check state of poll for the user (If we show meter template a "total" class exists)
        // This way we know that the user cast their vote already.
        if($( ".total" ).length > 0) {
          // Lock the poll if vote was cast.
          $('.js-poll-select').addClass('is-locked');

          // Get selected choice
          var selected = $('.choice-title[data-user-selected="1"]').once('pollSelection').text();

          // Set previously selected choice.
          $('.poll-teaser-item[data-entity-id="' + selected + '"]').addClass('is-active');
        }
        else {
          // Remove locked state and is-active state on all poll elements.
          $('.js-poll-select').removeClass('is-locked');
          $('.js-poll-select').removeClass('is-active');
        }
      });
    }
  }
})(jQuery);
