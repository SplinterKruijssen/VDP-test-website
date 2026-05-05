/* VDP Advies — shared.js */
(function () {
  'use strict';

  /* ── Nav scroll ── */
  var nav = document.getElementById('nav');
  if (nav) {
    function updateNav() {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Mobile menu toggle ── */
  var toggle = document.getElementById('nav-toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Menu sluiten' : 'Menu openen');
    });

    /* Close when a menu link is clicked */
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Menu openen');
      });
    });

    /* Close when clicking outside the nav */
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('menu-open') && !nav.contains(e.target)) {
        nav.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Menu openen');
      }
    });
  }

  /* ── Fade-on-scroll ── */
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });

  document.querySelectorAll('.fos').forEach(function (el) {
    obs.observe(el);
  });

  /* ── Active nav link ── */
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current) a.classList.add('active');
  });

  /* ── Diensten card-stack ── */
  function initDsStack(root) {
    var cards = Array.prototype.slice.call(root.querySelectorAll('.ds-stack-card'));
    var legenda = Array.prototype.slice.call(root.querySelectorAll('.ds-legenda-item'));
    var prevBtn = root.querySelector('[data-ds-prev]');
    var nextBtn = root.querySelector('[data-ds-next]');
    var counterCurrent = root.querySelector('.ds-stack-current');
    var counterTotal = root.querySelector('.ds-stack-total');
    var scrollTrack = root.querySelector('.ds-scroll-track');
    var scrollThumb = root.querySelector('.ds-scroll-thumb');
    if (!cards.length) return;

    /* order[i] = index into cards. order[0] is the front card. */
    var order = cards.map(function (_, i) { return i; });
    var animating = false;
    var SWIPE_THRESHOLD = 50;
    var SWIPE_VELOCITY = 0.5; /* px/ms */

    function applyPositions() {
      order.forEach(function (cardIdx, pos) {
        cards[cardIdx].setAttribute('data-pos', String(pos));
      });
      var activeIdx = order[0];
      legenda.forEach(function (li, i) {
        li.classList.toggle('is-active', i === activeIdx);
      });
      if (counterCurrent) counterCurrent.textContent = String(activeIdx + 1).padStart(2, '0');
      if (counterTotal) counterTotal.textContent = String(cards.length).padStart(2, '0');
      if (scrollThumb) scrollThumb.style.transform = 'translateX(' + (activeIdx * 100) + '%)';
      if (scrollTrack) scrollTrack.setAttribute('aria-valuenow', String(activeIdx + 1));
    }

    function moveToNext() {
      if (animating) return;
      animating = true;
      var front = cards[order[0]];
      front.classList.add('ds-stack-card--exiting-up');
      setTimeout(function () {
        front.classList.remove('ds-stack-card--exiting-up');
        order.push(order.shift());
        applyPositions();
        animating = false;
      }, 320);
    }
    function moveToPrev() {
      if (animating) return;
      animating = true;
      var front = cards[order[0]];
      front.classList.add('ds-stack-card--exiting-down');
      setTimeout(function () {
        front.classList.remove('ds-stack-card--exiting-down');
        order.unshift(order.pop());
        applyPositions();
        animating = false;
      }, 320);
    }
    function jumpTo(targetIdx) {
      if (animating) return;
      var safety = 0;
      while (order[0] !== targetIdx && safety++ < cards.length) {
        order.push(order.shift());
      }
      applyPositions();
    }

    applyPositions();

    if (prevBtn) prevBtn.addEventListener('click', moveToPrev);
    if (nextBtn) nextBtn.addEventListener('click', moveToNext);
    legenda.forEach(function (li, i) {
      li.addEventListener('click', function () { jumpTo(i); });
    });

    /* Scroll-track click → jump to position based on click x within the track */
    if (scrollTrack) {
      scrollTrack.addEventListener('click', function (e) {
        var rect = scrollTrack.getBoundingClientRect();
        var ratio = (e.clientX - rect.left) / rect.width;
        var target = Math.min(cards.length - 1, Math.max(0, Math.floor(ratio * cards.length)));
        jumpTo(target);
      });
      scrollTrack.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); moveToPrev(); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); moveToNext(); }
      });
    }

    /* Drag — only the active card */
    var dragging = false, startY = 0, startX = 0, startTime = 0, activeCard = null;

    cards.forEach(function (card) {
      card.addEventListener('pointerdown', function (e) {
        if (card.getAttribute('data-pos') !== '0') return;
        /* Don't start drag if user is clicking a link or button inside the card */
        if (e.target.closest('a, button')) return;
        activeCard = card;
        dragging = true;
        startY = e.clientY; startX = e.clientX;
        startTime = e.timeStamp;
        card.classList.add('is-grabbing');
        try { card.setPointerCapture(e.pointerId); } catch (_) {}
      });
      card.addEventListener('pointermove', function (e) {
        if (!dragging || card !== activeCard) return;
        var dy = e.clientY - startY;
        var dx = e.clientX - startX;
        var dragOpacity = Math.max(0.4, 1 - Math.abs(dy) / 320);
        card.style.transform = 'translate(' + (dx * 0.25) + 'px, ' + dy + 'px) rotate(' + (dx * 0.04) + 'deg)';
        card.style.opacity = String(dragOpacity);
      });
      function endDrag(e) {
        if (!dragging || card !== activeCard) return;
        var dy = e.clientY - startY;
        var dx = e.clientX - startX;
        var dt = Math.max(1, e.timeStamp - startTime);
        var velY = dy / dt;
        var velX = dx / dt;
        dragging = false; activeCard = null;
        card.classList.remove('is-grabbing');
        card.style.transform = '';
        card.style.opacity = '';
        var swipeY = Math.abs(dy) > SWIPE_THRESHOLD || Math.abs(velY) > SWIPE_VELOCITY;
        var swipeX = Math.abs(dx) > SWIPE_THRESHOLD || Math.abs(velX) > SWIPE_VELOCITY;
        if (swipeY && Math.abs(dy) >= Math.abs(dx)) {
          if (dy < 0) moveToNext(); else moveToPrev();
        } else if (swipeX && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) moveToNext(); else moveToPrev();
        }
      }
      card.addEventListener('pointerup', endDrag);
      card.addEventListener('pointercancel', function () {
        if (!dragging) return;
        dragging = false; activeCard = null;
        card.classList.remove('is-grabbing');
        card.style.transform = '';
        card.style.opacity = '';
      });
    });

    /* Keyboard nav when stack is focused */
    root.setAttribute('tabindex', '0');
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); moveToPrev(); }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); moveToNext(); }
    });
  }

  document.querySelectorAll('[data-ds-stack-root]').forEach(initDsStack);

  /* ══════════════════════════════════════════
     KANTOOR MODAL — wires up any [data-office] card on the page
     to a single shared #km-overlay modal that shows photo, address
     and a Leaflet map of the chosen office.
     Pages that include the modal markup also load Leaflet via a
     <script> tag near </body>.
  ══════════════════════════════════════════ */
  (function () {
    var overlay = document.getElementById('km-overlay');
    if (!overlay) return;
    var triggers = document.querySelectorAll('[data-office]');
    if (!triggers.length) return;

    var OFFICES = {
      bussum: {
        name: 'Bussum', address: 'Meerweg 45', postcode: '1405 BD Bussum',
        phone: '035 – 695 6900', fax: '035 – 695 6969',
        email: 'info@vdpadvies.nl',
        image: 'brand_assets/KantoorBussum.jpg',
        latlng: [52.278587, 5.147075]
      },
      hilversum: {
        name: 'Hilversum', address: 'Melkpad 20a', postcode: '1217 KC Hilversum',
        phone: '035 – 698 0414', fax: '035 – 698 2154',
        email: 'info@vdpadvies.nl',
        image: 'brand_assets/KantoorHilversum.jpg',
        latlng: [52.227645, 5.172671]
      },
      amsterdam: {
        name: 'Amsterdam', address: 'Keizersgracht 387D', postcode: '1016 EJ Amsterdam',
        email: 'info@vdpadvies.nl',
        image: 'brand_assets/KantoorAmsterdam.jpg',
        latlng: [52.363812, 4.888685]
      }
    };

    var backdrop   = document.getElementById('km-backdrop');
    var closeBtn   = document.getElementById('km-close-btn');
    var imgEl      = document.getElementById('km-img');
    var headingEl  = document.getElementById('km-heading');
    var addrEl     = document.getElementById('km-addr');
    var pcEl       = document.getElementById('km-pc');
    var contactsEl = document.getElementById('km-contacts');
    var card       = overlay.querySelector('.km-card');
    var focusTrigger = null;
    var isOpen = false;

    var SVG_PHONE = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.17 3.47 2 2 0 0 1 3.14 1h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 21 16z"/></svg>';
    var SVG_EMAIL = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>';

    var leafletMap = null;
    var leafletMarkers = {};

    function makeIcon(active) {
      return L.divIcon({
        className: 'km-lf-icon' + (active ? ' km-lf-active' : ''),
        html: '<div class="km-lf-wrap"><div class="km-lf-ring"></div><div class="km-lf-dot"></div></div>',
        iconSize: [28, 28], iconAnchor: [14, 14], tooltipAnchor: [0, -14]
      });
    }
    function initLeafletMap() {
      if (leafletMap || !window.L) return;
      leafletMap = L.map('km-leaflet-map', {
        zoomControl: true, scrollWheelZoom: false,
        attributionControl: true, dragging: true, doubleClickZoom: true
      });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>',
        subdomains: 'abcd', maxZoom: 19
      }).addTo(leafletMap);
      Object.keys(OFFICES).forEach(function (key) {
        var o = OFFICES[key];
        leafletMarkers[key] = L.marker(o.latlng, { icon: makeIcon(false) })
          .bindTooltip(o.name, { permanent: false, direction: 'top', className: 'km-lf-tooltip' })
          .addTo(leafletMap);
      });
      var mapEl = document.getElementById('km-leaflet-map');
      mapEl.addEventListener('mouseenter', function () { leafletMap.scrollWheelZoom.enable(); });
      mapEl.addEventListener('mouseleave', function () { leafletMap.scrollWheelZoom.disable(); });
      leafletMap.setView([52.30, 5.05], 10);
    }
    function focusLeafletOffice(key) {
      if (!leafletMap) return;
      Object.keys(leafletMarkers).forEach(function (k) {
        var el = leafletMarkers[k].getElement();
        if (el) el.classList.toggle('km-lf-active', k === key);
      });
      leafletMap.flyToBounds(L.latLngBounds([
        OFFICES.bussum.latlng, OFFICES.hilversum.latlng, OFFICES.amsterdam.latlng
      ]), { padding: [32, 32], duration: 0.9, easeLinearity: 0.3 });
    }

    function openModal(key, trigger) {
      var office = OFFICES[key];
      if (!office) return;
      focusTrigger = trigger || null;

      imgEl.src = office.image;
      imgEl.alt = 'VDP Kantoor ' + office.name;
      headingEl.textContent = office.name;
      addrEl.textContent = office.address;
      pcEl.textContent = office.postcode;
      contactsEl.innerHTML = '';
      if (office.phone) {
        var tel = document.createElement('a');
        tel.href = 'tel:' + office.phone.replace(/[^0-9]/g, '');
        tel.className = 'km-contact-row';
        tel.innerHTML = SVG_PHONE + office.phone;
        contactsEl.appendChild(tel);
      }
      if (office.fax) {
        var fax = document.createElement('p');
        fax.className = 'km-contact-fax';
        fax.textContent = 'Fax: ' + office.fax;
        contactsEl.appendChild(fax);
      }
      var mail = document.createElement('a');
      mail.href = 'mailto:' + office.email;
      mail.className = 'km-contact-row';
      mail.innerHTML = SVG_EMAIL + office.email;
      contactsEl.appendChild(mail);

      overlay.removeAttribute('hidden');
      overlay.classList.remove('km-out');
      overlay.classList.add('km-in');
      card.addEventListener('animationend', function handler() {
        overlay.classList.remove('km-in');
        card.removeEventListener('animationend', handler);
      });
      document.body.style.overflow = 'hidden';
      isOpen = true;
      closeBtn.focus();

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          if (!leafletMap) initLeafletMap();
          else leafletMap.invalidateSize();
          focusLeafletOffice(key);
        });
      });
    }
    function closeModal() {
      if (!isOpen) return;
      overlay.classList.remove('km-in');
      overlay.classList.add('km-out');
      card.addEventListener('animationend', function handler() {
        overlay.classList.remove('km-out');
        overlay.setAttribute('hidden', '');
        document.body.style.overflow = '';
        isOpen = false;
        if (focusTrigger) { focusTrigger.focus(); focusTrigger = null; }
        card.removeEventListener('animationend', handler);
      });
    }

    triggers.forEach(function (el) {
      el.addEventListener('click', function (e) {
        // Don't open modal when an inner link or button is clicked
        if (e.target.closest('a, button')) return;
        openModal(this.dataset.office, this);
      });
      el.addEventListener('keydown', function (e) {
        if (e.target !== el) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(this.dataset.office, this);
        }
      });
    });
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeModal();
    });
    overlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = Array.from(overlay.querySelectorAll(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      ));
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  })();
})();
