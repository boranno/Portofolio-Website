import { initShell } from './modules/shell.js';
import { initNavigation } from './modules/nav.js';
import { initScrollReveal } from './modules/reveal.js';
import { initProjectFilter } from './modules/project-filter.js';
import { initCopyEmail } from './modules/copy-email.js';

document.documentElement.classList.add('js-ready');

document.addEventListener('DOMContentLoaded', () => {
  initShell();
  initNavigation();
  initScrollReveal();
  initProjectFilter();
  initCopyEmail();
});
