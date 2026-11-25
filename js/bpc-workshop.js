(function () {

  'use strict';

  var nav = document.getElementById('bpc-nav');

  function toArray(list) {
    return Array.prototype.slice.call(list);
  }

  function scrollToEl(el, gap) {
    window.scrollTo({
      top: window.scrollY + el.getBoundingClientRect().top - nav.offsetHeight - gap,
      behavior: 'smooth'
    });
  }

  /* =====================
     TABS (speakers and activities): one panel visible at a time
     ===================== */
  function setupTabs(list, onClick) {
    var tabs = toArray(list.querySelectorAll('[role="tab"]'));

    function select(tab) {
      tabs.forEach(function (t) {
        var active = t === tab;
        t.setAttribute('aria-selected', active ? 'true' : 'false');
        t.tabIndex = active ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !active;
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        select(tab);
        onClick();
      });
      tab.addEventListener('keydown', function (e) {
        var step = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : (e.key === 'ArrowUp' || e.key === 'ArrowLeft') ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        var next = tabs[(i + step + tabs.length) % tabs.length];
        select(next);
        next.focus();
      });
    });

    return { tabs: tabs, select: select };
  }

  // Speakers: after switching while scrolled down, go back to the top of the list
  var speakers = document.querySelector('.bpc-tabs');
  setupTabs(speakers.querySelector('.bpc-tablist'), function () {
    if (speakers.getBoundingClientRect().top < nav.offsetHeight) scrollToEl(speakers, 24);
  });

  // Activities
  var actList = document.querySelector('.bpc-act-tabs');
  var activities = setupTabs(actList, function () {
    if (actList.getBoundingClientRect().top < 0) scrollToEl(actList, 16);
  });

  function openActivity(id) {
    var tab = activities.tabs.filter(function (t) {
      return t.getAttribute('aria-controls') === id;
    })[0];
    if (!tab) return false;
    activities.select(tab);
    scrollToEl(actList, 16);
    return true;
  }

  // Links such as #3mpc or #speed-mentoring open that activity
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || !openActivity(a.getAttribute('href').slice(1))) return;
    e.preventDefault();
    history.replaceState(null, '', a.getAttribute('href'));
  });

  function openFromHash() {
    openActivity(location.hash.slice(1));
  }
  window.addEventListener('hashchange', openFromHash);
  window.addEventListener('load', openFromHash);

  /* =====================
     NAVBAR: activities dropdown (hover on desktop, tap on touch screens)
     ===================== */
  var toggle = document.getElementById('bpc-activities-toggle');
  var menu = document.getElementById('bpc-activities-menu');
  var scroller = nav.querySelector('.bpc-nav-scroll');
  var items = toArray(menu.querySelectorAll('a'));
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var closeTimer = null;

  function placeMenu() {
    var left = toggle.getBoundingClientRect().left - nav.getBoundingClientRect().left;
    var max = nav.clientWidth - menu.offsetWidth - 12;
    menu.style.left = Math.max(12, Math.min(left, max)) + 'px';
  }

  function openMenu() {
    clearTimeout(closeTimer);
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    placeMenu();
  }

  function closeMenu() {
    clearTimeout(closeTimer);
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function (e) {
    if (canHover) {
      closeMenu();
      return;
    }
    e.preventDefault();
    if (menu.hidden) openMenu(); else closeMenu();
  });

  toggle.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowDown') return;
    e.preventDefault();
    openMenu();
    items[0].focus();
  });

  if (canHover) {
    [toggle, menu].forEach(function (el) {
      el.addEventListener('mouseenter', openMenu);
      el.addEventListener('mouseleave', function () {
        closeTimer = setTimeout(closeMenu, 180);
      });
    });
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', closeMenu);
    item.addEventListener('keydown', function (e) {
      var step = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      items[(i + step + items.length) % items.length].focus();
    });
  });

  document.addEventListener('click', function (e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || menu.hidden) return;
    closeMenu();
    toggle.focus();
  });

  menu.addEventListener('focusout', function (e) {
    if (e.relatedTarget && !menu.contains(e.relatedTarget) && e.relatedTarget !== toggle) closeMenu();
  });

  scroller.addEventListener('scroll', function () {
    if (!menu.hidden) placeMenu();
  }, { passive: true });

  /* =====================
     NAVBAR: shadow on scroll + highlight the section in view
     ===================== */
  var links = toArray(nav.querySelectorAll('.bpc-nav-links a'));
  var sections = links.map(function (a) {
    return document.getElementById(a.getAttribute('href').slice(1));
  });

  function updateNav() {
    nav.classList.toggle('is-scrolled', window.scrollY > 10);

    var line = nav.offsetHeight + 40;
    var current = -1;
    sections.forEach(function (sec, i) {
      if (sec.getBoundingClientRect().top <= line) current = i;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = sections.length - 1;
    }

    links.forEach(function (a, i) {
      var active = i === current;
      if (active && !a.classList.contains('is-active')) {
        // keep the active link visible inside the scrollable strip
        scroller.scrollTo({ left: a.offsetLeft - (scroller.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
      }
      a.classList.toggle('is-active', active);
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  window.addEventListener('resize', updateNav);
  updateNav();

  /* =====================
     FADE IN ON SCROLL
     ===================== */
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var el = entry.target;
      if (!entry.isIntersecting) return;
      io.unobserve(el);
      el.classList.add('is-visible');
      // once shown, give the element back its own transitions (hover effects)
      setTimeout(function () {
        el.classList.remove('reveal', 'is-visible');
      }, 1300);
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  [
    '.bpc-hero .col-md-7 > *',
    '.bpc-hero .workshop-facts > li',
    '.bpc-section .bpc-heading',
    '.bpc-lead',
    '.bpc-why-grid > *',
    '.bpc-band',
    '.bpc-collab',
    '.bpc-tabs',
    '.bpc-act-tabs > [role="tab"]',
    '.bpc-org-grid > .bpc-org-logo',
    '.bpc-org-text',
    '.bpc-org-sub',
    '.bpc-photo-pair > img',
    '.bpc-city > *',
    '.bpc-wide-img',
    '.bpc-place',
    '.bpc-discover-link',
    '.bpc-tip'
  ].forEach(function (selector) {
    toArray(document.querySelectorAll(selector)).forEach(function (el) {
      // stagger items that sit side by side
      var siblings = toArray(el.parentNode.children).filter(function (c) {
        return c.matches(selector);
      });
      el.style.setProperty('--reveal-delay', Math.min(siblings.indexOf(el) * 110, 440) + 'ms');
      el.classList.add('reveal');
      io.observe(el);
    });
  });
})();
