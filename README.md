# JellyCut — support, legal and promo website

Static site for https://jellycut.werle.app (App Store support URL, privacy policy URL, marketing URL).

**This folder is the source of truth.** It is mirrored 1:1 (minus `scripts/`) into the public repo
[`OnePieceMonkey/jellycut-support`](https://github.com/OnePieceMonkey/jellycut-support), which GitHub Pages
serves from `main` / root under the custom domain in `CNAME`. Never edit the Pages repo directly.

## Publish

```sh
website/scripts/publish_site.sh "Describe the change"
```

The script clones the Pages repo into a temp dir, rsyncs `website/` over it (with `--delete`), commits and pushes.

## Structure

| Path | What |
|---|---|
| `index.html`, `de/ it/ es/ zh/ ar/ ja/ ko/index.html` | Landing + support FAQ. **Generated** — edit copy in `scripts/build_landing.py`, then `python3 website/scripts/build_landing.py` |
| `privacy.html` | Privacy policy (EN). The app links here. |
| `de/datenschutz.html` | Datenschutzerklärung (DE). `datenschutz.html` at the root is a copy for the old in-app URL `/datenschutz` — keep both in sync (see sed recipe in git history or copy + fix paths). |
| `impressum.html`, `de/impressum.html` | Legal notice EN / Impressum DE (DE is authoritative) |
| `404.html` | Self-contained (inline CSS, root-absolute links) — Pages serves it at any depth |
| `assets/config.js` | **Launch switches:** `appStoreUrl` (empty = “Coming soon”), `showScreenshots`, `appIcon` |
| `assets/style.css`, `assets/site.js` | Styles, tiny vanilla JS (store CTA, gallery, tap-to-wobble) |
| `assets/icon.svg` | Placeholder icon until the final one exists |
| `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` | Pages / crawler plumbing |

## At launch

1. `assets/config.js` → `appStoreUrl: "https://apps.apple.com/app/id<APPLE_ID>"`.
2. Drop `assets/shot-01.png` … `shot-05.png` (portrait, ~1179×2556), set `showScreenshots: true`.
3. Drop `assets/icon.png` (1024×1024), set `appIcon: "assets/icon.png"`; optionally add `<link rel="apple-touch-icon">`.
4. Publish.

## GitHub Pages rules (see papercuts)

- Pages stay `.html` files. `/impressum` resolves to `impressum.html`, **not** `impressum/index.html`;
  folder + redirect combos loop. Directory URLs with a trailing slash (`/de/`) serve `index.html`.
- Asset paths are relative (`assets/…`, `../assets/…`) so the pages work on any host; only `404.html` uses
  root-absolute links, which rely on the custom domain.
- Without the `CNAME` file Pages serves under `onepiecemonkey.github.io/jellycut-support/`.

## Colours

Stage `#E2DFDA`, ink `#1C1B19`, accent `#9E1B2B`. Muted text is `#5F5B55` on the web (the app's `#6D6962`
only reaches 4.1:1 on the stage colour, below WCAG AA for body text).
