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


  const json_catalog = await $.getJSON('../data/spark/category.json');
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
        const url = `/quote/html/spark/${ maintype }/${ name }.html`;
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
      const url = `/quote/html/spark/${ state.type }/${ state.name }.html`;
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
        const url = `/quote/html/spark/${ maintype }/${ name }.html`;
        load_main_content(url, sid);
      } else {
        default_nav();
      }
    } else {
      default_nav();
    }
  }



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

  $('#button_add_reply').click(function() {
    $('#editor_head_content').text('添加一条关于此话题的瞬间想法');
    $('#editor_content .timeline-item').eq(0).hide();
    $('#button_add_group').hide();
    $('#page').addClass('editor_mode');
  });
  $('#button_add_topic').click(function() {
    $('#editor_head_content').text('输入格式：类别/话题名称');
    $('#editor_content .timeline-item').eq(0).hide();
    $('#button_add_group').hide();
    $('#page').addClass('editor_mode');
  });
  $('#editor_head_close > a').click(function(e) {
    e.preventDefault();
    $('#page').removeClass('editor_mode');
    $('#button_add_group').show();
  });
  $('#content').on('click', '.timeline-item .thread-foot span.comment', function() {
    const item = $(this).closest('.timeline-item');
    const content = item.find('.thread-body').text();
    const head_info = item.find('.head-info > div > span');
    const name = head_info.eq(0).text();
    const date = head_info.eq(1).text();
    const editor_items = $('#editor_content .timeline-item');
    editor_items.eq(0).find('.thread-head > div').text(name);
    editor_items.eq(0).find('.thread-body').text(content);
    editor_items.eq(0).find('.thread-foot').text(date);
    editor_items.eq(0).show();
    $('#editor_head_content').text('回复本话题的这个瞬间想法');
    $('#button_add_group').hide();
    $('#page').addClass('editor_mode');
  });
})(jQuery);

function load_main_content(url, sid) {
  $('#content').load(url);
  status_nav(sid);
}

function default_nav() {
  const url_sub_default = '/quote/html/spark/invest/consumer_industry_stocks.html';
  const sid_sub_default = '101001';
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
