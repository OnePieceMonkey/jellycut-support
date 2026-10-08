# App Store badges (for release day — not shown yet)

Official Apple "Download on the App Store" badges, black (preferred) variant, downloaded unmodified
as SVG from Apple's marketing toolbox on 2026-10-06:

```
https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/<locale>
```

| File | Page | Apple locale | Alt text |
|---|---|---|---|
| `app-store-badge-en.svg` | `/` | `en-us` | Download on the App Store |
| `app-store-badge-de.svg` | `/de/` | `de-de` | Laden im App Store |
| `app-store-badge-es.svg` | `/es/` | `es-es` | Descargar en el App Store |
| `app-store-badge-it.svg` | `/it/` | `it-it` | Scarica su App Store |
| `app-store-badge-ja.svg` | `/ja/` | `ja-jp` | App Storeからダウンロード |
| `app-store-badge-ko.svg` | `/ko/` | `ko-kr` | App Store에서 다운로드하기 |
| `app-store-badge-zh.svg` | `/zh/` | `zh-cn` (simplified) | 在 App Store 下载 |
| `app-store-badge-ar.svg` | `/ar/` | `ar-ar` (`ar-sa`/`ar-ae` return 404) | حمّل من App Store |

Widths differ (ja/zh are narrower, ko is wider); always size by **height** and let width be `auto`.

## Release-day checklist

1. Set `appStoreUrl` in `assets/config.js` (country-neutral `https://apps.apple.com/app/id<APPLE_ID>`).
2. Make the live CTA in `assets/site.js` render the badge instead of the home-made pill, e.g.:

   ```js
   var lang = (document.documentElement.lang || 'en').slice(0, 2);
   var a = document.createElement('a');
   a.className = 'store-badge';
   a.href = cfg.appStoreUrl;
   a.innerHTML = '<img src="' + root + 'assets/badges/app-store-badge-' + lang + '.svg" alt="'
     + (cta.getAttribute('data-badge-alt') || 'Download on the App Store') + '" height="48">';
   cta.replaceWith(a);
   ```

   and emit `data-badge-alt` (alt text from the table above) from `scripts/build_landing.py`, then rebuild.
3. CSS: `.store-badge{display:inline-block;line-height:0;border:0}` and
   `.store-badge img{display:block;height:48px;width:auto}` — no hover effect, no transform, no animation.
4. Add Apple's credit line where the footer carries legal info (EN/DE wording as on pulsegate.werle.app).
5. Publish with `website/scripts/publish_site.sh`, then check with curl that the SVG serves and the link
   points to the right App Store page.

## Apple rules that apply (developer.apple.com/app-store/marketing/guidelines)

- Use only Apple's artwork; never redraw, recolor, translate "App Store" or build your own localized badge.
- One badge per layout — the hero CTA. No second badge in footer or price section.
- At least 40 px high on screen (we use 48 px); clear space at least ¼ of the badge height (12 px at 48 px).
- Don't modify, angle or animate it (no hover lift, no GSAP/entrance tweens on the badge itself).
- Keep it subordinate to the headline; it must link to the app's App Store product page.
- Only usable once the app is actually available on the App Store, so keep it off the site until then.
- Credit both Apple and the Apple logo in the legal/footer area once the badge is used.
