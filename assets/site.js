(function () {
  'use strict';
  var cfg = window.JELLYCUT_CONFIG || {};
  var root = document.documentElement.getAttribute('data-root') || '';

  // App Store CTA: stays a static "Coming soon" label until a URL is configured,
  // then becomes Apple's official badge (never restyled: no hover, no transform).
  var BADGE_ALT = {
    en: 'Download on the App Store', de: 'Laden im App Store', es: 'Descargar en el App Store',
    it: 'Scarica su App Store', ja: 'App Storeからダウンロード', ko: 'App Store에서 다운로드하기',
    zh: '在 App Store 下载', ar: 'حمّل من App Store'
  };
  var cta = document.getElementById('store-cta');
  if (cta && cfg.appStoreUrl) {
    var lang = (document.documentElement.lang || 'en').slice(0, 2);
    if (!BADGE_ALT[lang]) lang = 'en';
    var a = document.createElement('a');
    a.className = 'store-badge';
    a.href = cfg.appStoreUrl;
    a.innerHTML = '<img src="' + root + 'assets/badges/app-store-badge-' + lang + '.svg" alt="'
      + BADGE_ALT[lang] + '" height="48">';
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
