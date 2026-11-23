/**
 * Purposeful Scroll Reveal:
 * - Reveals [data-reveal] elements once upon entering the viewport
 * - Immediately reveals all elements if prefers-reduced-motion is enabled
 */
export function initScrollReveal() {
  const targets = Array.from(document.querySelectorAll('[data-reveal]'));
  if (targets.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const delay = Number(entry.target.getAttribute('data-reveal-delay') || 0);
        if (delay > 0) {
          entry.target.style.transitionDelay = `${Math.min(delay, 240)}ms`;
        }
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.01, rootMargin: '0px 0px -20px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
