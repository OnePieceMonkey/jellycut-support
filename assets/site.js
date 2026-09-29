(function () {
  'use strict';
  var cfg = window.JELLYCUT_CONFIG || {};
  var root = document.documentElement.getAttribute('data-root') || '';

  // App Store CTA: stays a static "Coming soon" label until a URL is configured.
  var cta = document.getElementById('store-cta');
  if (cta && cfg.appStoreUrl) {
    var a = document.createElement('a');
    a.className = 'cta';
    a.href = cfg.appStoreUrl;
    a.innerHTML = cta.querySelector('svg') ? cta.querySelector('svg').outerHTML : '';
    a.appendChild(document.createTextNode(cta.getAttribute('data-live-label') || 'Download on the App Store'));
    cta.replaceWith(a);
    var note = document.getElementById('store-note');
    if (note) note.hidden = true;
  }

  // Final app icon, once it exists.
  if (cfg.appIcon) {
    document.querySelectorAll('img.js-app-icon').forEach(function (img) { img.src = root + cfg.appIcon; });
  }

  // Screenshot gallery: markup ships hidden, images load only when enabled.
  var gallery = document.getElementById('screens');
  if (gallery && cfg.showScreenshots) {
    var n = cfg.screenshotCount || 5;
    gallery.querySelectorAll('img[data-src]').forEach(function (img, i) {
      if (i < n) img.src = img.getAttribute('data-src');
      else img.closest('li').remove();
    });
    gallery.hidden = false;
  }

  // The jelly on the page: tap to wobble.
  var btn = document.getElementById('jelly-btn');
  var jelly = document.getElementById('jelly');
  if (btn && jelly) {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    btn.addEventListener('click', function () {
      if (reduced) return;
      btn.classList.remove('is-wobbling');
      void btn.offsetWidth; // restart the animation on repeated taps
      btn.classList.add('is-wobbling');
    });
    jelly.addEventListener('animationend', function () { btn.classList.remove('is-wobbling'); });
  }
})();
