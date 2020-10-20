(async function ($) {
  const url_head = './html/nav/head.html';
  $('#top').load(url_head, function() {
    $('#nav_top .nav_tabs a').each(function(i, v) {
      $(v).removeClass('on');
      if ($(v).data('sid') === 'home') {
        $(v).addClass('on');
      }
    });
  });

  const url_nav = './html/nav/home_left.html';
  $('#nav').load(url_nav, function() {
    console.log('nav loaded');
  });

  $('#top').on('click', '.menu', function(e) {
    e.preventDefault();
    $('#page').addClass('columns2');
    $('.nav_tabs .close').removeClass('hidden');
    $('.nav_tabs .menu').addClass('hidden');
  });
  $('#top').on('click', '.close', function(e) {
    e.preventDefault();
    $('#page').removeClass('columns2');
    $('.nav_tabs .close').addClass('hidden');
    $('.nav_tabs .menu').removeClass('hidden');
  });
})(jQuery);
