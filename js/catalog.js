(async function ($) {
  const url = './nav/head.html';
  $('#top').load(url, function() {
    $('#nav_top .nav_tabs a').each(function(i, v) {
      $(v).removeClass('on');
      if ($(v).data('sid') === 'lore') {
        $(v).addClass('on');
      }
    });
  });

  const json_catalog = await $.getJSON('../data/catalog/category.json');
  const html_nav = tmpl_catalog(json_catalog);

  $('#nav').html(html_nav);
  $('#nav').find('.level_2').each(function(i, v) {
    const elms_lv1 = $(v).find('.level_1 > a');
    const maintype = elms_lv1.eq(0).attr('href');
    elms_lv1.each(function(j, k) {
      $(k).click(function(e) {
        e.preventDefault();
        const name = $(this).attr('href');
        if (maintype === name) return;
        $('#nav .level_1').removeClass('on');
        $(k).parent().addClass('on');
        const id = $(this).data('sid');
        const url = `/quote/html/category/${ maintype }/${ name }.html`;
        $('#content').load(url, function() {
          const url = `?sid=${ id }`;
          history.pushState({ sid: id, name, type: maintype }, name, url);
        });
      });
    });
  });

  window.addEventListener('popstate', function(e) {
    const state = e.state;
    if (state) {
      const url = `/quote/html/category/${ state.type }/${ state.name }.html`;
      const sid = state.sid;
      load_main_content(url, sid);
    } else {
      console.log('empty');
      nav_by_sid();
    }
  });

  nav_by_sid();

  function nav_by_sid() {
    const sid = get_query('sid');
    const pid = sid.toString().slice(0, 4);
    const obj_current = json_catalog.find(v => v.sid === pid);
    if (obj_current) {
      const obj_current_sub = obj_current.children.find(v => v.sid === sid);
      if (obj_current_sub) {
        const maintype = obj_current.name;
        const name = obj_current_sub.name;
        const sid = obj_current_sub.sid;
        const url = `/quote/html/category/${ maintype }/${ name }.html`;
        load_main_content(url, sid);
      } else {
        default_nav();
      }
    } else {
      default_nav();
    }
  }



  $('#bar').on('click', '.level_1 a', function(e) {
    e.preventDefault();
    const index = $(this).attr('href');
    const anchor = $('#content .anchor').eq(index);
    const summary = anchor.parent();
    $('#bar .level_1').removeClass('on').eq(index).addClass('on');
    scrollTo(0, summary.offset().top - 50);
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

function load_main_content(url, sid) {
  $('#content').load(url);
  status_nav(sid);
}

function default_nav() {
  const url_sub_default = '/quote/html/category/program/file.html';
  const sid_sub_default = '100410';
  load_main_content(url_sub_default, sid_sub_default);
}

function status_nav(sid) {
  const elms = $('#nav .level_1 a');
  const elm = elms.toArray().find(e => sid == $(e).data('sid'));
  if (elm) {
    $('#nav .level_1').removeClass('on');
    $(elm).parent().addClass('on');
  }
}

function get_query(key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp('^(?:.*[&\\?]' + encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') + '(?:\\=([^&]*))?)?.*$', 'i'), '$1'));  
}  

function tmpl_catalog(data) {
  const lvs_2 = [];
  data.forEach(function(v, i) {
    const lvs_1 = v.children.map(k => `<div class="level_1"><a data-sid="${ k.sid }" href="${ k.name }">- ${ k.title }</a></div>`).join('');
    const lv_1 = `<div class="level_1"><a data-sid="${ v.sid }" href="${ v.name }">- ${ v.title }</a></div>`;
    lvs_2.push(`<div class="level_2">${ lv_1 }${ lvs_1 }</div>`);
  });
  return `<div class="nav_left">${ lvs_2.join('') }</div>`;
}