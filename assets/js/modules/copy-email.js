/**
 * Progressive-enhancement Copy Email action with aria-live feedback.
 */
export function initCopyEmail() {
  const copyBtn = document.querySelector('[data-copy-email]');
  const feedback = document.querySelector('[data-copy-feedback]');

  if (!copyBtn) return;

  let resetTimer = null;

  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-copy-email');
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      if (feedback) {
        feedback.textContent = 'Email address copied to clipboard.';
      }
      copyBtn.dataset.copied = 'true';
      const label = copyBtn.querySelector('[data-copy-label]');
      if (label) label.textContent = 'Copied';

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        if (label) label.textContent = 'Copy Email';
        if (feedback) feedback.textContent = '';
        delete copyBtn.dataset.copied;
      }, 2400);
    } catch {
      if (feedback) {
        feedback.textContent = `Direct email: ${email}`;
      }
    }
  });
}
