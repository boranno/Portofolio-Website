/**
 * Subtle Editorial Custom Mouse Cursor (Phase H.4)
 * - Central dot + trailing thin outer ring rendered with CSS transforms
 * - Enabled strictly on fine-pointer hover-capable devices without reduced motion
 * - On-demand requestAnimationFrame loop (stops automatically when settled)
 * - Preserves native text selection, form control cursors, lightbox & page transitions
 */
export function initCustomCursor() {
  if (document.querySelector('.custom-cursor')) return;

  const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!finePointerQuery.matches || reducedMotionQuery.matches) return;

  const INTERACTIVE_SELECTOR =
    'a[href], button, [role="button"], .project-card, .is-lightbox-trigger, summary, label[for]';
  const FORM_CONTROL_SELECTOR =
    'input, textarea, select, [contenteditable="true"]';

  const container = document.createElement('div');
  container.className = 'custom-cursor';
  container.setAttribute('aria-hidden', 'true');

  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';

  container.appendChild(ring);
  container.appendChild(dot);
  document.body.appendChild(container);

  let targetX = -100;
  let targetY = -100;
  let ringX = -100;
  let ringY = -100;
  let visible = false;
  let rafId = null;

  const LERP = 0.2;

  function renderFrame() {
    const dx = targetX - ringX;
    const dy = targetY - ringY;

    ringX += dx * LERP;
    ringY += dy * LERP;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

    if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15) {
      rafId = window.requestAnimationFrame(renderFrame);
    } else {
      ringX = targetX;
      ringY = targetY;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = null;
    }
  }

  function scheduleRender() {
    if (rafId === null) {
      rafId = window.requestAnimationFrame(renderFrame);
    }
  }

  function setVisible(nextVisible) {
    if (visible === nextVisible) return;
    visible = nextVisible;
    container.classList.toggle('is-visible', visible);
  }

  function updateContext(target) {
    if (!(target instanceof Element)) return;

    const overForm = Boolean(target.closest(FORM_CONTROL_SELECTOR));
    container.classList.toggle('is-hidden-for-input', overForm);

    const overInteractive = !overForm && Boolean(target.closest(INTERACTIVE_SELECTOR));
    container.classList.toggle('is-hovering', overInteractive);

    const overDark = Boolean(target.closest('.band--dark, .site-footer-band, .media-lightbox'));
    container.classList.toggle('is-over-dark', overDark);
  }

  document.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType === 'touch') {
        setVisible(false);
        return;
      }

      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      if (!visible) {
        ringX = targetX;
        ringY = targetY;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        setVisible(true);
      }

      updateContext(event.target);
      scheduleRender();
    },
    { passive: true }
  );

  document.addEventListener(
    'pointerdown',
    (event) => {
      if (event.pointerType === 'touch') {
        setVisible(false);
        return;
      }
      container.classList.add('is-pressed');
    },
    { passive: true }
  );

  document.addEventListener(
    'pointerup',
    () => {
      container.classList.remove('is-pressed');
    },
    { passive: true }
  );

  document.addEventListener('pointerleave', () => {
    setVisible(false);
    container.classList.remove('is-pressed', 'is-hovering');
  });

  window.addEventListener('blur', () => {
    setVisible(false);
    container.classList.remove('is-pressed', 'is-hovering');
  });

  const handleMediaChange = () => {
    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      setVisible(false);
      container.hidden = true;
    } else {
      container.hidden = false;
    }
  };

  if (finePointerQuery.addEventListener) {
    finePointerQuery.addEventListener('change', handleMediaChange);
    reducedMotionQuery.addEventListener('change', handleMediaChange);
  }
}
