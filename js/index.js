(async function ($) {
  const url = './nav/head.html';
  $('#top').load(url, function() {
    $('#nav_top .nav_tabs a').each(function(i, v) {
      $(v).removeClass('on');
      if ($(v).data('sid') === 'home') {
        $(v).addClass('on');
      }
    });
  });
})(jQuery);
