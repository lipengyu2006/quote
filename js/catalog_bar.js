(async function ($) {
  tmpl_bar();
})(jQuery);

function tmpl_bar() {
  const elms = $('#content').find('.anchor').toArray();
  const brief = elms.map((v, i) => `<div class="level_1"><a href="${ i }" title="${ $(v).text().replace(/"/g, "&quot;") }">${ $(v).text() }</a></div>`);
  const html = brief.join('');
  $('#bar .nav_right').html(html);
}
