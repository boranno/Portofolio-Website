/**
 * Universal Shared Shell & Navigation Loader (Classic Script)
 * Mounts the single-source Header, Mobile Drawer, and Footer synchronously
 * across all nested pages and initializes accessible navigation behavior.
 *
 * Works identically across:
 * - http://localhost:8080/
 * - GitHub Pages subpath (/Portofolio-Website/)
 * - Direct local file:// previews (no ES module CORS failure)
 */
(function () {
  'use strict';

  var NAV_ITEMS = [
    { id: 'home', label: 'Home', path: '', code: '00' },
    { id: 'about', label: 'About', path: 'about/', code: '01' },
    { id: 'work', label: 'Work', path: 'work/', code: '02' },
    { id: 'research', label: 'Research', path: 'research/', code: '03' },
    { id: 'cv', label: 'CV', path: 'cv/', code: '04' },
    { id: 'contact', label: 'Contact', path: 'contact/', code: '05' }
  ];

  var PAGE_SECTION_MAP = {
    agrishift: 'work',
    'academic-performance-ml': 'work',
    'esp32-iot': 'work'
  };

  var PROFILE_LINKS = {
    email: 'mailto:borannogolder@gmail.com',
    emailLabel: 'borannogolder@gmail.com',
    github: 'https://github.com/boranno',
    linkedin: 'https://www.linkedin.com/in/boranno-golder/'
  };

  function resolvePath(root, path) {
    var normalizedRoot = root.endsWith('/') ? root : root + '/';
    return path ? normalizedRoot + path + 'index.html' : normalizedRoot + 'index.html';
  }

  function renderHeaderMarkup(root, activePage) {
    var homeHref = resolvePath(root, '');

    var desktopLinks = NAV_ITEMS.map(function (item) {
      var href = resolvePath(root, item.path);
      var isCurrent = item.id === activePage;
      return (
        '<li><a class="nav-link' +
        (isCurrent ? ' is-active' : '') +
        '" href="' +
        href +
        '"' +
        (isCurrent ? ' aria-current="page"' : '') +
        '>' +
        item.label +
        '</a></li>'
      );
    }).join('');

    var mobileLinks = NAV_ITEMS.map(function (item) {
      var href = resolvePath(root, item.path);
      var isCurrent = item.id === activePage;
      return (
        '<li class="mobile-nav-item">' +
        '<a class="mobile-nav-link" href="' +
        href +
        '"' +
        (isCurrent ? ' aria-current="page"' : '') +
        '>' +
        '<span>' +
        item.label +
        '</span>' +
        '<span class="mono-label">' +
        item.code +
        ' / ' +
        item.label.toUpperCase() +
        '</span>' +
        '</a>' +
        '</li>'
      );
    }).join('');

    return (
      '<header class="site-header" data-header>' +
      '<div class="container header-inner">' +
      '<a class="wordmark" href="' +
      homeHref +
      '" aria-label="Boranno Golder — Home">' +
      'Boranno Golder<span class="wordmark-dot" aria-hidden="true">.</span>' +
      '</a>' +
      '<nav class="primary-nav" aria-label="Primary">' +
      '<ul class="nav-list">' +
      desktopLinks +
      '</ul>' +
      '</nav>' +
      '<div class="header-actions">' +
      '<a class="btn btn--secondary btn--sm" href="' +
      PROFILE_LINKS.email +
      '">' +
      'Email ' +
      '<svg class="arrow-right" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
      '<path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>' +
      '</a>' +
      '</div>' +
      '<button class="menu-toggle" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-nav" aria-label="Open navigation menu">' +
      '<svg class="icon-menu" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
      '<path d="M3 6H17M3 10H17M3 14H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      '</svg>' +
      '<svg class="icon-close" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
      '<path d="M5 5L15 15M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      '</svg>' +
      '</button>' +
      '</div>' +
      '</header>' +
      '<div class="mobile-drawer" id="mobile-nav" data-mobile-drawer hidden>' +
      '<nav aria-label="Mobile navigation">' +
      '<ul class="mobile-nav-list">' +
      mobileLinks +
      '</ul>' +
      '</nav>' +
      '<div class="mobile-drawer-footer">' +
      '<a class="mono-meta" href="' +
      PROFILE_LINKS.email +
      '">' +
      PROFILE_LINKS.emailLabel +
      '</a>' +
      '<a class="mono-meta" href="' +
      PROFILE_LINKS.github +
      '" target="_blank" rel="noopener noreferrer">GitHub</a>' +
      '<a class="mono-meta" href="' +
      PROFILE_LINKS.linkedin +
      '" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
      '</div>' +
      '</div>'
    );
  }

  function renderFooterMarkup(root, activePage) {
    var homeHref = resolvePath(root, '');

    var navLinks = NAV_ITEMS.map(function (item) {
      var href = resolvePath(root, item.path);
      var isCurrent = item.id === activePage;
      return (
        '<li><a class="footer-link" href="' +
        href +
        '"' +
        (isCurrent ? ' aria-current="page"' : '') +
        '>' +
        item.label +
        '</a></li>'
      );
    }).join('');

    return (
      '<div class="site-footer-band">' +
      '<div class="container">' +
      '<footer class="site-footer">' +
      '<div class="footer-top">' +
      '<a class="footer-brand" href="' +
      homeHref +
      '" aria-label="Boranno Golder — Home">' +
      'Boranno Golder<span class="wordmark-dot" aria-hidden="true">.</span>' +
      '</a>' +
      '<nav aria-label="Footer navigation">' +
      '<ul class="footer-nav">' +
      navLinks +
      '</ul>' +
      '</nav>' +
      '<ul class="footer-socials" aria-label="Professional links">' +
      '<li><a class="footer-link" href="' +
      PROFILE_LINKS.email +
      '">Email</a></li>' +
      '<li><a class="footer-link" href="' +
      PROFILE_LINKS.github +
      '" target="_blank" rel="noopener noreferrer">GitHub</a></li>' +
      '<li><a class="footer-link" href="' +
      PROFILE_LINKS.linkedin +
      '" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>' +
      '</ul>' +
      '</div>' +
      '<div class="footer-meta">' +
      '<span class="mono-meta">&copy; 2026 Boranno Golder. Built with semantic HTML, CSS &amp; vanilla JS.</span>' +
      '<div class="footer-links">' +
      '<a class="footer-link" href="#top">Back to top &uarr;</a>' +
      '</div>' +
      '</div>' +
      '</footer>' +
      '</div>' +
      '</div>'
    );
  }

  function mountShell() {
    var root = document.documentElement.getAttribute('data-root') || './';
    var rawPage = document.documentElement.getAttribute('data-page') || 'home';
    var activePage = PAGE_SECTION_MAP[rawPage] || rawPage;

    var headerMount = document.querySelector('[data-site-header]');
    if (headerMount && !headerMount.querySelector('[data-header]')) {
      headerMount.innerHTML = renderHeaderMarkup(root, activePage);
    }

    var footerMount = document.querySelector('[data-site-footer]');
    if (footerMount && !footerMount.querySelector('.site-footer')) {
      footerMount.innerHTML = renderFooterMarkup(root, activePage);
    }
  }

  function bindNavigation() {
    var header = document.querySelector('[data-header]');
    var toggleBtn = document.querySelector('[data-menu-toggle]');
    var drawer = document.querySelector('[data-mobile-drawer]');

    if (header && !header.hasAttribute('data-nav-bound')) {
      header.setAttribute('data-nav-bound', 'true');
      var updateHeaderState = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 12);
      };
      updateHeaderState();
      window.addEventListener('scroll', updateHeaderState, { passive: true });
    }

    if (toggleBtn && drawer && !toggleBtn.hasAttribute('data-nav-bound')) {
      toggleBtn.setAttribute('data-nav-bound', 'true');

      var setDrawerOpen = function (isOpen, restoreFocus) {
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

      setDrawerOpen(false, false);

      toggleBtn.addEventListener('click', function () {
        var isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        setDrawerOpen(!isExpanded, false);
      });

      drawer.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          setDrawerOpen(false, false);
        });
      });

      document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
          setDrawerOpen(false, true);
        }
      });

      document.addEventListener('click', function (event) {
        if (
          drawer.classList.contains('is-open') &&
          !drawer.contains(event.target) &&
          !toggleBtn.contains(event.target)
        ) {
          setDrawerOpen(false, false);
        }
      });

      var desktopMedia = window.matchMedia('(min-width: 768px)');
      if (desktopMedia.addEventListener) {
        desktopMedia.addEventListener('change', function (event) {
          if (event.matches && drawer.classList.contains('is-open')) {
            setDrawerOpen(false, false);
          }
        });
      }
    }
  }

  function init() {
    mountShell();
    bindNavigation();
  }

  init();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  }
})();
