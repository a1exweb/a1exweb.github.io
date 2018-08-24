jQuery(document).ready(function ($) {
  $('.nav__btn--menu').click(function() {
    $('.menu--down').toggle();
  });

  $('.members-down__btn--all').click(function() {
    $('.members-down__profile').removeClass('d-none');
  });

    $("#tabs").tabs({
      active: 1
    });
});
