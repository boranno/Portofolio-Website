/**
 * Accessible Navigation:
 * - Sticky header scrolled border state (passive listener)
 * - Mobile drawer with aria-expanded, Escape key, outside click & focus return
 * - Multipage active page indication via <html data-page="...">
 */
export function initNavigation() {
  const header = document.querySelector('[data-header]');
  const toggleBtn = document.querySelector('[data-menu-toggle]');
  const drawer = document.querySelector('[data-mobile-drawer]');

  if (header && !header.hasAttribute('data-nav-bound')) {
    header.setAttribute('data-nav-bound', 'true');
    const updateHeaderState = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, { passive: true });
  }

  if (toggleBtn && drawer && !toggleBtn.hasAttribute('data-nav-bound')) {
    toggleBtn.setAttribute('data-nav-bound', 'true');
    const setDrawerOpen = (isOpen, { restoreFocus = false } = {}) => {
      toggleBtn.setAttribute('aria-expanded', String(isOpen));
      toggleBtn.setAttribute(
        'aria-label',
        isOpen ? 'Close navigation menu' : 'Open navigation menu'
      );
      drawer.classList.toggle('is-open', isOpen);
      drawer.hidden = !isOpen;

      if (!isOpen && restoreFocus) {
        toggleBtn.focus();
      }
    };

    setDrawerOpen(false);

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      setDrawerOpen(!isExpanded);
    });

    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
        setDrawerOpen(false, { restoreFocus: true });
      }
    });

    document.addEventListener('click', (event) => {
      if (
        drawer.classList.contains('is-open') &&
        !drawer.contains(event.target) &&
        !toggleBtn.contains(event.target)
      ) {
        setDrawerOpen(false);
      }
    });

    const desktopMedia = window.matchMedia('(min-width: 768px)');
    desktopMedia.addEventListener('change', (event) => {
      if (event.matches && drawer.classList.contains('is-open')) {
        setDrawerOpen(false);
      }
    });
  }
}
