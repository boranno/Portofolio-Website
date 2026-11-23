import { initShell } from './modules/shell.js';
import { initNavigation } from './modules/nav.js';
import { initScrollReveal } from './modules/reveal.js';
import { initProjectFilter } from './modules/project-filter.js';
import { initCopyEmail } from './modules/copy-email.js';
import { initLightbox } from './modules/lightbox.js';
import { initCustomCursor } from './modules/cursor.js';

document.documentElement.classList.add('js-ready');

let initialized = false;

function boot() {
  if (initialized) return;
  initialized = true;

  initShell();
  initNavigation();
  initScrollReveal();
  initProjectFilter();
  initCopyEmail();
  initLightbox();
  initCustomCursor();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
