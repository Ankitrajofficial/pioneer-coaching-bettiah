/* ===== Pioneer Coaching — main.js ===== */
// Mark that JS is active so reveal-on-scroll only hides content when JS can show it again.
document.documentElement.classList.add('js');

// Central config so you can change the number/address in ONE place.
window.PIONEER = {
  name: 'Pioneer Coaching',
  phoneDisplay: '062021 49922',
  phoneDial: '+916202149922',      // tel: link
  whatsapp: '916202149922',        // wa.me number (country code + number, no +)
  address: 'Sagar Pokhara Road, Kamalnath Nagar, Paroraha, Bettiah, Bihar 845438',
  email: 'rahl43k@gmail.com',      // change to your real email

  // ⬇️ Paste your Google Apps Script Web App URL here (ends in /exec).
  // Leave it blank to keep using the WhatsApp fallback until it's set up.
  enquiryEndpoint: ''
};

/* ============================================================
   NOTICES — single source of truth (used by ticker + Notices page)
   Edit this list to update both the scrolling bar and notices.html
   ============================================================ */
window.PIONEER_NOTICES = [
  { day: '15', mon: 'Jun', tag: 'Admission', title: 'New session admissions open', text: 'Class 11 & 12 (Maths & Biology) admissions are now open. Limited seats per batch.' },
  { day: '20', mon: 'Jun', tag: 'Demo', title: 'Free demo classes every Saturday', text: 'Attend a free demo class every Saturday at 10:00 AM. Just call to reserve a seat.' },
  { day: '25', mon: 'Jun', tag: 'Tests', title: 'Monthly test series begins', text: 'Chapter-wise and full-syllabus tests start this month for all batches.' },
  { day: '01', mon: 'Jul', tag: 'Batch', title: 'Combined Maths + Biology batch', text: 'Discounted combined batch starting soon — enquire for the schedule and fees.' },
  { day: '15', mon: 'Aug', tag: 'Holiday', title: 'Center closed on Independence Day', text: 'The center will remain closed on 15 August. Classes resume the next day.' }
];

/* ============================================================
   i18n — Hindi / English. To translate ANY element on a page,
   add a data-hi="हिंदी text" attribute to it. The toggle does the rest.
   ============================================================ */
var NAV_HI = {
  'index.html': 'होम', 'about.html': 'हमारे बारे में', 'courses.html': 'कोर्स',
  'faculty.html': 'शिक्षक', 'results.html': 'परिणाम', 'gallery.html': 'गैलरी',
  'contact.html': 'संपर्क', 'notices.html': 'सूचनाएं', 'timetable.html': 'समय सारणी',
  'blog.html': 'ब्लॉग', 'faq.html': 'सामान्य प्रश्न', 'brochure.html': 'ब्रोशर'
};
var TEXT_HI = {
  'Call Now': 'कॉल करें', 'Enquire Now': 'पूछताछ करें', 'More': 'अधिक',
  'Quick Links': 'त्वरित लिंक', 'Courses': 'कोर्स', 'Get in Touch': 'संपर्क करें'
};

(function () {
  var D = document;
  var fileName = (location.pathname.split('/').pop() || 'index.html') || 'index.html';

  // ---------- Notice ticker (injected at very top of page) ----------
  function injectTicker() {
    var list = window.PIONEER_NOTICES || [];
    if (!list.length) return;
    var items = list.map(function (n) {
      return '<span class="dot">◆</span><span data-hi="' + (n.title_hi || n.title) + '">' + n.title + '</span>';
    }).join('');
    var bar = D.createElement('div');
    bar.className = 'ticker';
    bar.innerHTML =
      '<div class="ticker-label" data-hi="ताज़ा">Latest</div>' +
      '<div class="ticker-track"><div class="ticker-move">' + items + items + '</div></div>';
    D.body.insertBefore(bar, D.body.firstChild);
  }

  // ---------- "More" dropdown + active state ----------
  function injectDropdown() {
    var nav = D.querySelector('.nav-links');
    if (!nav) return;
    var more = ['notices.html', 'timetable.html', 'blog.html', 'faq.html', 'brochure.html'];
    var labels = { 'notices.html': 'Notices', 'timetable.html': 'Time Table', 'blog.html': 'Blog', 'faq.html': 'FAQ', 'brochure.html': 'Brochure' };
    var wrap = D.createElement('span');
    wrap.className = 'has-drop';
    var menu = more.map(function (f) {
      var active = (f === fileName) ? ' class="active"' : '';
      return '<a href="' + f + '"' + active + ' data-hi="' + (NAV_HI[f] || labels[f]) + '">' + labels[f] + '</a>';
    }).join('');
    wrap.innerHTML = '<a class="drop-toggle" data-hi="अधिक">More <span style="font-size:.7em">▾</span></a><div class="drop-menu">' + menu + '</div>';
    nav.appendChild(wrap);
    // active highlight on the toggle if a child page is open
    if (more.indexOf(fileName) !== -1) wrap.querySelector('.drop-toggle').classList.add('active');
    // mobile/tap support
    wrap.querySelector('.drop-toggle').addEventListener('click', function (e) { e.preventDefault(); wrap.classList.toggle('open'); });
  }

  // ---------- Language toggle ----------
  function injectLangToggle() {
    var cta = D.querySelector('.nav-cta');
    if (!cta) return;
    var btn = D.createElement('button');
    btn.className = 'lang-toggle always';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Switch language');
    cta.insertBefore(btn, cta.firstChild);
    btn.addEventListener('click', function () {
      var next = (localStorage.getItem('pioneerLang') === 'hi') ? 'en' : 'hi';
      localStorage.setItem('pioneerLang', next);
      applyLang(next);
    });
    window._pioneerLangBtn = btn;
  }

  // Tag the shared "chrome" (nav links, buttons, footer headings) with data-hi
  function tagChrome() {
    D.querySelectorAll('.nav-links a').forEach(function (a) {
      var f = (a.getAttribute('href') || '').split('/').pop();
      if (NAV_HI[f] && !a.hasAttribute('data-hi')) a.setAttribute('data-hi', NAV_HI[f]);
    });
    D.querySelectorAll('.nav-cta a, .footer h4').forEach(function (el) {
      var t = el.textContent.trim();
      if (TEXT_HI[t] && !el.hasAttribute('data-hi')) el.setAttribute('data-hi', TEXT_HI[t]);
    });
  }

  function applyLang(lang) {
    D.querySelectorAll('[data-hi]').forEach(function (el) {
      if (!el.hasAttribute('data-en')) el.setAttribute('data-en', el.textContent);
      el.textContent = (lang === 'hi') ? el.getAttribute('data-hi') : el.getAttribute('data-en');
    });
    D.documentElement.lang = (lang === 'hi') ? 'hi' : 'en';
    if (window._pioneerLangBtn) window._pioneerLangBtn.textContent = (lang === 'hi') ? '🌐 English' : '🌐 हिंदी';
  }

  // ---------- Mobile nav toggle ----------
  function navToggle() {
    var toggle = D.querySelector('.nav-toggle');
    var links = D.querySelector('.nav-links');
    if (!toggle || !links) return;
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.querySelectorAll('a:not(.drop-toggle)').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // ---------- Scroll reveal ----------
  function reveals() {
    // Tell the inline <head> failsafe that the reveal logic is running, so it
    // won't force-show everything (which would skip the scroll animation).
    window.__pioneerReveal = true;
    var els = D.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && els.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12 });
      els.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });
    } else { els.forEach(function (el) { el.classList.add('in'); }); }
  }

  // ---------- Animated counters ----------
  function counters() {
    var els = D.querySelectorAll('[data-count]');
    if (!('IntersectionObserver' in window) || !els.length) return;
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '', t0 = null;
        function step(ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1400, 1);
          el.textContent = Math.floor(p * target).toLocaleString('en-IN') + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { co.observe(el); });
  }

  // ---------- Enquiry forms (Google Apps Script backend → saved to Google Sheet) ----------
  var COLOR_OK = '#1e7e34', COLOR_ERR = '#c0392b', COLOR_INFO = '';
  function setNote(form, msg, color) {
    var note = form.querySelector('.form-note');
    if (note) { note.textContent = msg; note.style.color = color || ''; }
  }
  function forms() {
    D.querySelectorAll('form[data-enquiry]').forEach(function (form) {
      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var fd = new FormData(form);
        var d = {
          name: (fd.get('name') || '').toString().trim(),
          phone: (fd.get('phone') || '').toString().trim(),
          email: (fd.get('email') || '').toString().trim(),
          course: (fd.get('course') || '').toString().trim(),
          message: (fd.get('message') || '').toString().trim(),
          page: document.title
        };
        if (!d.name || !d.phone) { setNote(form, 'Please enter your name and phone number.', COLOR_ERR); return; }
        if (!/^[0-9+\-\s]{7,15}$/.test(d.phone)) { setNote(form, 'Please enter a valid phone number.', COLOR_ERR); return; }

        var endpoint = window.PIONEER.enquiryEndpoint;
        var btn = form.querySelector('button[type="submit"]');
        if (!endpoint) {
          setNote(form, 'Our enquiry form is being set up. Please call us at ' + window.PIONEER.phoneDisplay + '.', COLOR_ERR);
          return;
        }
        var originalLabel = btn ? btn.innerHTML : '';
        if (btn) { btn.disabled = true; btn.innerHTML = 'Sending…'; }
        setNote(form, 'Sending your enquiry…', COLOR_INFO);
        fetch(endpoint, { method: 'POST', body: new URLSearchParams(d), mode: 'no-cors' })
          .then(function () {
            setNote(form, '✓ Thank you! Your enquiry has been received — our team will contact you shortly.', COLOR_OK);
            form.reset();
          })
          .catch(function () {
            setNote(form, 'Sorry, your enquiry could not be sent. Please try again, or call us at ' + window.PIONEER.phoneDisplay + '.', COLOR_ERR);
          })
          .then(function () { if (btn) { btn.disabled = false; btn.innerHTML = originalLabel; } });
      });
    });
  }

  // ---------- FAQ accordion ----------
  function faq() {
    D.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = q.closest('.faq-item');
        var isOpen = item.classList.contains('open');
        D.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
        if (!isOpen) item.classList.add('open');
      });
    });
  }

  // ---------- Gallery lightbox ----------
  function lightbox() {
    var items = Array.prototype.slice.call(D.querySelectorAll('.gallery-item'));
    if (!items.length) return;
    var idx = 0;
    var lb = D.createElement('div');
    lb.className = 'lb';
    lb.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close">✕</button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous">‹</button>' +
      '<div class="lb-stage"></div>' +
      '<button class="lb-btn lb-next" aria-label="Next">›</button>' +
      '<div class="lb-cap"></div>';
    D.body.appendChild(lb);
    var stage = lb.querySelector('.lb-stage'), cap = lb.querySelector('.lb-cap');

    function show(i) {
      idx = (i + items.length) % items.length;
      var el = items[idx];
      var img = el.getAttribute('data-img');
      var label = (el.querySelector('span') ? el.querySelector('span').textContent : '').trim();
      if (img) {
        stage.style.background = 'none';
        stage.innerHTML = '<img src="' + img + '" alt="' + label + '">';
      } else {
        stage.style.background = el.style.background || '#111';
        stage.innerHTML = '<div class="lb-placeholder">' + (label.split(' ')[0] || '🖼️') + '</div>';
      }
      cap.textContent = label;
    }
    function open(i) { show(i); lb.classList.add('open'); }
    function close() { lb.classList.remove('open'); }

    items.forEach(function (el, i) { el.addEventListener('click', function () { open(i); }); });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    D.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  // ---------- Render Notices page (if #notices-list exists) ----------
  function renderNotices() {
    var box = D.getElementById('notices-list');
    if (!box) return;
    box.innerHTML = (window.PIONEER_NOTICES || []).map(function (n) {
      return '<div class="notice-item reveal">' +
        '<div class="notice-date"><div class="d">' + n.day + '</div><div class="m">' + n.mon + '</div></div>' +
        '<div class="notice-body"><span class="notice-tag">' + n.tag + '</span>' +
        '<h4>' + n.title + '</h4><p>' + n.text + '</p></div></div>';
    }).join('');
  }

  // ---------- Footer year ----------
  function year() { var y = D.getElementById('year'); if (y) y.textContent = new Date().getFullYear(); }

  // ---------- Init ----------
  injectTicker();
  injectDropdown();
  injectLangToggle();
  tagChrome();
  renderNotices();
  navToggle();
  faq();
  lightbox();
  forms();
  reveals();
  counters();
  year();
  applyLang(localStorage.getItem('pioneerLang') === 'hi' ? 'hi' : 'en');
})();
