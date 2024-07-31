(async function ($) {
  const url_head = './nav/head.html';
  $('#top').load(url_head, function() {
    $('#nav_top .nav_tabs a').each(function(i, v) {
      $(v).removeClass('on');
      if ($(v).data('sid') === 'spark') {
        $(v).addClass('on');
      }
    });
  });
  $('#top').on('click', '.menu', function(e) {
    e.preventDefault();
    $('#page').addClass('nav_mode');
    $('.nav_tabs .close').removeClass('hidden');
    $('.nav_tabs .menu').addClass('hidden');
  });
  $('#top').on('click', '.close', function(e) {
    e.preventDefault();
    $('#page').removeClass('nav_mode');
    $('.nav_tabs .close').addClass('hidden');
    $('.nav_tabs .menu').removeClass('hidden');
  });

  $('.textarea').on('input', function(e) {
    $(this).css('height', 40);
    var scrollHeight = $(this).prop('scrollHeight');
    $(this).css('height', scrollHeight + 2);
  });
})(jQuery);
