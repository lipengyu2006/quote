(async function ($) {
  const url_nav = './admin/nav/left.html';
  $('#nav').load(url_nav, function() {
    console.log('have loaded nav bar');
  });
  const url_content = './admin/content/body.html';
  $('#content').load(url_content, function() {
    console.log('have loaded body content');
  });
})(jQuery);


