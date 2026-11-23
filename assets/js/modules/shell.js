/**
 * Shared Multipage Shell (Header, Mobile Drawer, Footer)
 * Single source of truth for navigation & footer across nested directories.
 * Resolves all internal URLs relatively via <html data-root="./ | ../ | ../../">
 * for full compatibility with GitHub Pages repository subpaths.
 */

const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '', code: '00' },
  { id: 'about', label: 'About', path: 'about/', code: '01' },
  { id: 'work', label: 'Work', path: 'work/', code: '02' },
  { id: 'research', label: 'Research', path: 'research/', code: '03' },
  { id: 'cv', label: 'CV', path: 'cv/', code: '04' },
  { id: 'contact', label: 'Contact', path: 'contact/', code: '05' }
];

const PAGE_SECTION_MAP = {
  agrishift: 'work',
  'academic-performance-ml': 'work',
  'esp32-iot': 'work'
};

const PROFILE_LINKS = {
  email: 'mailto:borannogolder@gmail.com',
  emailLabel: 'borannogolder@gmail.com',
  github: 'https://github.com/boranno',
  linkedin: 'https://www.linkedin.com/in/boranno-golder/'
};

function resolvePath(root, path) {
  const normalizedRoot = root.endsWith('/') ? root : `${root}/`;
  return path ? `${normalizedRoot}${path}index.html` : `${normalizedRoot}index.html`;
}

function renderHeaderMarkup(root, activePage) {
  const homeHref = resolvePath(root, '');

  const desktopLinks = NAV_ITEMS.map((item) => {
    const href = resolvePath(root, item.path);
    const isCurrent = item.id === activePage;
    return `<li><a class="nav-link${isCurrent ? ' is-active' : ''}" href="${href}"${
      isCurrent ? ' aria-current="page"' : ''
    }>${item.label}</a></li>`;
  }).join('');

  const mobileLinks = NAV_ITEMS.map((item) => {
    const href = resolvePath(root, item.path);
    const isCurrent = item.id === activePage;
    return `
      <li class="mobile-nav-item">
        <a class="mobile-nav-link" href="${href}"${isCurrent ? ' aria-current="page"' : ''}>
          <span>${item.label}</span>
          <span class="mono-label">${item.code} / ${item.label.toUpperCase()}</span>
        </a>
      </li>`;
  }).join('');

  return `
    <header class="site-header" data-header>
      <div class="container header-inner">
        <a class="wordmark" href="${homeHref}" aria-label="Boranno Golder — Home">
          Boranno Golder<span class="wordmark-dot" aria-hidden="true">.</span>
        </a>

        <nav class="primary-nav" aria-label="Primary">
          <ul class="nav-list">${desktopLinks}</ul>
        </nav>

        <div class="header-actions">
          <a class="btn btn--secondary btn--sm" href="${PROFILE_LINKS.email}">
            Email
            <svg class="arrow-right" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        <button
          class="menu-toggle"
          type="button"
          data-menu-toggle
          aria-expanded="false"
          aria-controls="mobile-nav"
          aria-label="Open navigation menu"
        >
          <svg class="icon-menu" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <svg class="icon-close" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </header>

    <div class="mobile-drawer" id="mobile-nav" data-mobile-drawer hidden>
      <nav aria-label="Mobile navigation">
        <ul class="mobile-nav-list">${mobileLinks}</ul>
      </nav>
      <div class="mobile-drawer-footer">
        <a class="mono-meta" href="${PROFILE_LINKS.email}">${PROFILE_LINKS.emailLabel}</a>
        <a class="mono-meta" href="${PROFILE_LINKS.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a class="mono-meta" href="${PROFILE_LINKS.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  `;
}

function renderFooterMarkup(root, activePage) {
  const homeHref = resolvePath(root, '');

  const navLinks = NAV_ITEMS.map((item) => {
    const href = resolvePath(root, item.path);
    const isCurrent = item.id === activePage;
    return `<li><a class="footer-link" href="${href}"${
      isCurrent ? ' aria-current="page"' : ''
    }>${item.label}</a></li>`;
  }).join('');

  return `
    <div class="site-footer-band">
      <div class="container">
        <footer class="site-footer">
          <div class="footer-top">
            <a class="footer-brand" href="${homeHref}" aria-label="Boranno Golder — Home">
              Boranno Golder<span class="wordmark-dot" aria-hidden="true">.</span>
            </a>

            <nav aria-label="Footer navigation">
              <ul class="footer-nav">${navLinks}</ul>
            </nav>

            <ul class="footer-socials" aria-label="Professional links">
              <li><a class="footer-link" href="${PROFILE_LINKS.email}">Email</a></li>
              <li><a class="footer-link" href="${PROFILE_LINKS.github}" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a class="footer-link" href="${PROFILE_LINKS.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>

          <div class="footer-meta">
            <span class="mono-meta">&copy; 2026 Boranno Golder. Built with semantic HTML, CSS &amp; vanilla JS.</span>
            <div class="footer-links">
              <a class="footer-link" href="#top">Back to top ↑</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  `;
}

export function initShell() {
  const root = document.documentElement.getAttribute('data-root') || './';
  const rawPage = document.documentElement.getAttribute('data-page') || 'home';
  const activePage = PAGE_SECTION_MAP[rawPage] || rawPage;

  const headerMount = document.querySelector('[data-site-header]');
  if (headerMount && !headerMount.querySelector('[data-header]')) {
    headerMount.innerHTML = renderHeaderMarkup(root, activePage);
  }

  const footerMount = document.querySelector('[data-site-footer]');
  if (footerMount && !footerMount.querySelector('.site-footer')) {
    footerMount.innerHTML = renderFooterMarkup(root, activePage);
  }
}
