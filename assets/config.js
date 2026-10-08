// Single source of truth for everything that changes at launch.
// Loaded by every landing page (EN + 7 translations).
window.JELLYCUT_CONFIG = {
  // Empty = "Coming soon to the App Store" (no link).
  // At launch: "https://apps.apple.com/app/id<APPLE_ID>" (country-neutral URL).
  appStoreUrl: "https://apps.apple.com/app/id6817272978",

  // Set to true once assets/shot-01.png … shot-05.png exist (portrait, 1179 x 2556 or similar).
  // While false the screenshot section stays hidden.
  showScreenshots: false,
  screenshotCount: 5,

  // Empty = the drawn placeholder (assets/icon.svg). Set to "assets/icon.png" once the final icon exists.
  appIcon: ""
};
