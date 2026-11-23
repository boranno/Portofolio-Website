/**
 * Lightweight Accessible Image Lightbox (Phase H)
 * - Activates on any [data-lightbox] container or <img> with a real loaded image
 * - Supports click-to-open, keyboard Enter/Space, Escape close, backdrop click close
 * - Locks background scroll while open and restores focus on close
 * - Zero external dependencies; respects prefers-reduced-motion via CSS
 */
export function initLightbox() {
  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  if (triggers.length === 0) return;

  let overlay = null;
  let dialogImg = null;
  let dialogCaption = null;
  let closeBtn = null;
  let lastTrigger = null;

  function ensureOverlay() {
    if (overlay) return;

    overlay = document.createElement('div');
    overlay.className = 'media-lightbox';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image preview');
    overlay.hidden = true;

    overlay.innerHTML = `
      <div class="media-lightbox-backdrop" data-lightbox-close></div>
      <div class="media-lightbox-dialog">
        <button
          type="button"
          class="media-lightbox-close"
          data-lightbox-close
          aria-label="Close image preview"
        >
          <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
        </button>
        <figure class="media-lightbox-figure">
          <img class="media-lightbox-img" alt="">
          <figcaption class="media-lightbox-caption" hidden></figcaption>
        </figure>
      </div>
    `;

    document.body.appendChild(overlay);
    dialogImg = overlay.querySelector('.media-lightbox-img');
    dialogCaption = overlay.querySelector('.media-lightbox-caption');
    closeBtn = overlay.querySelector('.media-lightbox-close');

    overlay.addEventListener('click', (event) => {
      if (
        event.target === overlay ||
        event.target.closest('[data-lightbox-close]') ||
        event.target.classList.contains('media-lightbox-dialog') ||
        event.target.classList.contains('media-lightbox-figure')
      ) {
        close();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (!overlay || overlay.hidden) return;
      if (event.key === 'Escape') {
        close();
      } else if (event.key === 'Tab') {
        event.preventDefault();
        closeBtn.focus();
      }
    });
  }

  function open(src, alt, caption, triggerEl) {
    if (!src) return;
    ensureOverlay();
    lastTrigger = triggerEl || document.activeElement;

    dialogImg.src = src;
    dialogImg.alt = alt || '';

    if (caption) {
      dialogCaption.textContent = caption;
      dialogCaption.hidden = false;
    } else {
      dialogCaption.textContent = '';
      dialogCaption.hidden = true;
    }

    overlay.hidden = false;
    document.documentElement.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function close() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    dialogImg.removeAttribute('src');
    document.documentElement.classList.remove('lightbox-open');
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  triggers.forEach((el) => {
    if (el.hasAttribute('data-lightbox-bound')) return;
    const img = el.tagName === 'IMG' ? el : el.querySelector('img');
    if (!img) return; // Never activate lightbox on empty placeholder slots

    el.setAttribute('data-lightbox-bound', 'true');

    if (el.tagName !== 'BUTTON' && el.tagName !== 'A') {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      if (!el.hasAttribute('aria-label')) {
        el.setAttribute('aria-label', img.alt ? `Expand image: ${img.alt}` : 'Expand image');
      }
    }
    el.classList.add('is-lightbox-trigger');

    const activate = () => {
      const src = el.getAttribute('data-lightbox-src') || img.currentSrc || img.getAttribute('src');
      const figure = el.closest('figure');
      const figcaption = figure ? figure.querySelector('figcaption') : null;
      const caption = el.getAttribute('data-lightbox-caption') || (figcaption ? figcaption.textContent.trim() : '');
      open(src, img.alt, caption, el);
    };

    el.addEventListener('click', activate);
    el.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
  });
}
