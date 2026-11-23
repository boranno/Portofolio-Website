/**
 * Synchronous Project Category Filter:
 * - Zero timer race conditions
 * - Accessible aria-pressed state + live count announcement
 */
export function initProjectFilter() {
  const filterButtons = Array.from(document.querySelectorAll('[data-project-filter]'));
  const projectCards = Array.from(document.querySelectorAll('[data-project-card]'));
  const statusRegion = document.querySelector('[data-filter-status]');

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.getAttribute('data-project-filter');

      filterButtons.forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn === button));
      });

      let visibleCount = 0;
      projectCards.forEach((card) => {
        const categories = (card.getAttribute('data-categories') || '').split(' ');
        const matches = selected === 'all' || categories.includes(selected);
        card.hidden = !matches;
        if (matches) visibleCount += 1;
      });

      if (statusRegion) {
        statusRegion.textContent = `Showing ${visibleCount} ${
          visibleCount === 1 ? 'project' : 'projects'
        }.`;
      }
    });
  });
}
