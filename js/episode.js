(async function ($) {
  const url = './nav/head.html';
  $('#top').load(url, function() {
    $('#nav_top .nav_tabs a').each(function(i, v) {
      $(v).removeClass('on');
      if ($(v).data('sid') === 'english') {
        $(v).addClass('on');
      }
    });
  });


  $('#nav').on('click', '.level_2 div.m', function(e) {
    const year = $(this).parent().find('.y').text();
    const month = $(this).text().slice(1);
    const url = `episode/${ year }/sen_${ month }.html`;
    $('#nav div.m').removeClass('on');
    $(this).addClass('on');
    $('#sentences').load(url);
  });
  $('#nav').load('nav/episode_left.html', function() {
    $('#nav .level_2:nth-child(1) .level_1:nth-child(2)').click();
  });
  $('#bar').load('bar/episode_phrase.html');
})(jQuery);

