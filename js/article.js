let state_section = [];

function fire(stuck, target) {
  const evt = new CustomEvent('sticky-change', {detail: {stuck, target}});
  document.dispatchEvent(evt);
}

function normalizeTitle(title) {
  return title.replace(/[\s!]/g, '-');
}

function generatePage(container) {
  const MSGS = [
    'No',
    'JavaScript',
    'scroll events',
    'were',
    'used',
    'on',
    'this',
    'page!'
  ];

  const t = container.querySelector('template');
  const toc = document.querySelector('#toc > ul');
  //const t2 = toc.querySelector('template');

  MSGS.forEach((msg, i) => {
    const clone = t.content.cloneNode(true);
    const h2 = clone.querySelector('h2');
    const id = normalizeTitle(msg);
    h2.textContent = msg;
    h2.id = id;
    container.appendChild(clone);
    state_section.push({id, enter: false});

    //const tocClone = t2.content.cloneNode(true);
    //const a = tocClone.querySelector('a');
    //a.textContent = msg;
    //a.href = `#${normalizeTitle(msg)}`;
    //toc.appendChild(tocClone);
  });
}

function addSentinels(container, className) {
  return Array.from(container.querySelectorAll('.sticky')).map(el => {
    const sentinel = document.createElement('div');
    sentinel.classList.add('sticky_sentinel', className);
    return el.parentElement.appendChild(sentinel);
  });
}

function observeHeaders(container) {
  const observer = new IntersectionObserver((records, observer) => {
    for (const record of records) {
      const targetInfo = record.boundingClientRect;
      const stickyTarget = record.target.parentElement.querySelector('.sticky');
      const rootBoundsInfo = record.rootBounds;

      if (targetInfo.bottom < rootBoundsInfo.top) {
        console.log('--header--', true);
        fire(true, stickyTarget);
      }

      if (targetInfo.bottom >= rootBoundsInfo.top &&
          targetInfo.bottom < rootBoundsInfo.bottom) {
        console.log('--header--', false);
       fire(false, stickyTarget);
      }
    }
  }, {
    // rootMargin: '-16px',
    //root: container,
    threshold: [0]
  });

  // Add the bottom sentinels to each section and attach an observer.
  const sentinels = addSentinels(container, 'sticky_sentinel--top');
  sentinels.forEach(el => observer.observe(el));
}

function observeFooters(container) {
  const observer = new IntersectionObserver((records, observer) => {
    for (const record of records) {
      const targetInfo = record.boundingClientRect;
      const stickyTarget = record.target.parentElement.querySelector('.sticky');
      const rootBoundsInfo = record.rootBounds;
      const ratio = record.intersectionRatio;

      if (targetInfo.bottom > rootBoundsInfo.top && ratio === 1) {
        console.log('--footer--', true);
        fire(true, stickyTarget);
      }

      if (targetInfo.top < rootBoundsInfo.top &&
          targetInfo.bottom < rootBoundsInfo.bottom) {
        console.log('--footer--', false);
        fire(false, stickyTarget);
      }
    }
  }, {
    // rootMargin: '16px',
    //root: container,
    // Get callback slightly before element is 100% visible/invisible.
    threshold: [1]
  });

  // Add the bottom sentinels to each section and attach an observer.
  const sentinels = addSentinels(container, 'sticky_sentinel--bottom');
  sentinels.forEach(el => observer.observe(el));
}

function notifyWhenStickyHeadersChange(container) {
  observeHeaders(container);
  observeFooters(container);
}

(async function ($) {
  const container = document.querySelector('#container');
  generatePage(container);
  notifyWhenStickyHeadersChange(container);

  document.addEventListener('sticky-change', e => {
    // Update sticking header title.
    const [header, stuck] = [e.detail.target, e.detail.stuck];
    header.classList.toggle('shadow', stuck);
    const id = header.querySelector('h2').getAttribute('id');
    console.log(id, stuck);
    state_section = state_section.map(o => {
      if (o.id === id) {
        return {id, enter: stuck};
      } else {
        return o;
      }
    });
    const str = stuck ? header.textContent : '--';
    const whoIsSticky = document.querySelector('.who_is_sticky label');
    whoIsSticky.textContent = str;
    const stateSection = document.querySelector('#state_section');
    stateSection.innerHTML = state_section.map(o => o.id + '-<strong>' + o.enter + '</strong>').join('<br>');
  });
})(jQuery);

