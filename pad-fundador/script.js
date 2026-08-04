/* ══════════════════════════════════════════════════════════════
   PAD FUNDADOR — Jan Rosê · script.js
   Vanilla JS puro: sem dependências, sem frameworks.
   ══════════════════════════════════════════════════════════════ */

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('on');

    // fecha os outros itens abertos (accordion de item único)
    document.querySelectorAll('.faq-item.on').forEach((open) => {
      if (open !== item) {
        open.classList.remove('on');
        open.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      }
    });

    item.classList.toggle('on', !isOpen);
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
});

/* ── Scroll reveal (IntersectionObserver) ── */
const revealEls = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  // fallback: navegadores sem suporte simplesmente mostram tudo
  revealEls.forEach((el) => el.classList.add('in-view'));
}
