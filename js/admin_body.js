(async function ($) {
  const url_content_nav = './admin/content/nav/assign.html';
  $('#assign').load(url_content_nav, function() {
    console.log('have loaded nav bar of the content');
  });
  const url_content_main = './admin/content/screen/main.html';
  $('#screen').load(url_content_main, function() {
    console.log('have loaded the screen of the content');
  });
})(jQuery);


