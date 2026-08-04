/* ══════════════════════════════════════════════════════════════
   OPORTUNIDADE JAN ROSÊ — script.js
   Vanilla JS puro: roteador de telas (SPA leve), FAQ, contadores,
   scroll-reveal, parallax leve e formulário com Supabase.
   ══════════════════════════════════════════════════════════════ */

const WPP_GRUPO = 'https://chat.whatsapp.com/E6qgflNZtBcLffbNYBttXE?s=sh&p=a&ilr=0';
const TELAS_VALIDAS = ['home', 'sobre', 'ganhar', 'faq', 'comecar'];

/* ── ROTEADOR DE TELAS ── */
function irParaTela(id, { updateHash = true } = {}) {
  if (!TELAS_VALIDAS.includes(id)) id = 'home';

  document.querySelectorAll('.tela').forEach((tela) => {
    tela.classList.toggle('active', tela.dataset.tela === id);
  });
  document.querySelectorAll('[data-nav]').forEach((el) => {
    const isMatch = el.dataset.nav === id;
    if (el.classList.contains('nav-link')) {
      if (isMatch) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    }
  });

  if (updateHash) history.pushState(null, '', '#' + id);
  window.scrollTo({ top: 0, behavior: 'auto' });
  fecharMenuMobile();
  reobservarReveals();
}

document.querySelectorAll('[data-nav]').forEach((el) => {
  el.addEventListener('click', () => irParaTela(el.dataset.nav));
});

window.addEventListener('popstate', () => {
  const id = location.hash.replace('#', '') || 'home';
  irParaTela(id, { updateHash: false });
});

/* tela inicial, respeitando link direto (#faq, #sobre, etc.) */
irParaTela(location.hash.replace('#', '') || 'home', { updateHash: false });

/* ── MENU MOBILE ── */
const navBurger = document.getElementById('nav-burger');
const navMobile = document.getElementById('nav-mobile');
function fecharMenuMobile() {
  navMobile.classList.remove('open');
  navBurger.setAttribute('aria-expanded', 'false');
}
navBurger.addEventListener('click', () => {
  const aberto = navMobile.classList.toggle('open');
  navBurger.setAttribute('aria-expanded', String(aberto));
});

/* FAQ: agora é <details>/<summary> nativo — abre/fecha sem depender de JS */

/* ── SCROLL REVEAL (re-observável ao trocar de tela) ── */
let revealObserver;
function reobservarReveals() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('in-view'));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
            if (entry.target.querySelector('[data-count]')) animarContadores(entry.target);
            if (entry.target.hasAttribute('data-count')) animarContadores(entry.target.parentElement);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
  }
  document
    .querySelector('.tela.active')
    .querySelectorAll('[data-reveal]:not(.in-view)')
    .forEach((el) => {
      el.classList.add('pre-reveal'); // só some depois que o JS assume o controle
      revealObserver.observe(el);
      // rede de segurança: se por algum motivo o observer nunca disparar,
      // garante que o conteúdo apareça de qualquer forma.
      setTimeout(() => el.classList.add('in-view'), 2500);
    });
}

/* ── CONTADORES ── */
const contadoresAnimados = new WeakSet();
function animarContadores(escopo) {
  const nums = (escopo || document).querySelectorAll('[data-count]');
  nums.forEach((el) => {
    if (contadoresAnimados.has(el)) return;
    contadoresAnimados.add(el);
    const alvo = parseInt(el.dataset.count, 10);
    const duracao = 1200;
    const inicio = performance.now();
    function passo(agora) {
      const t = Math.min(1, (agora - inicio) / duracao);
      const easeOut = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(alvo * easeOut);
      if (t < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  });
}

/* ── PARALLAX leve no hero ── */
const heroBg = document.querySelector('.hero-bg');
if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY;
      if (y < window.innerHeight) heroBg.style.transform = `translateY(${y * 0.15}px)`;
    },
    { passive: true }
  );
}

/* ── FORMULÁRIO ── */
const OBJETIVO_LABEL = { consumir: 'Quer apenas consumir', revender: 'Quer revender', equipe: 'Quer construir equipe' };

function mostrarErroForm(msg) {
  const erro = document.getElementById('form-erro');
  erro.textContent = msg;
  erro.classList.add('on');
}

document.getElementById('form-comecar').addEventListener('submit', async (e) => {
  e.preventDefault();
  const erro = document.getElementById('form-erro');
  erro.classList.remove('on');

  const nome = document.getElementById('f-nome').value.trim();
  const telefone = document.getElementById('f-tel').value.trim();
  const profissao = document.getElementById('f-prof').value.trim();
  const cidade = document.getElementById('f-cidade').value.trim();
  const estado = document.getElementById('f-estado').value;
  const objetivo = document.querySelector('input[name="objetivo"]:checked')?.value || 'consumir';

  if (!nome || !telefone || !cidade || !estado) {
    mostrarErroForm('Preencha nome, telefone, cidade e estado pra continuar 😊');
    return;
  }

  const btn = document.getElementById('form-btn');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  if (window.sb) {
    try {
      await window.sb.from('leads').insert({
        nome_completo: nome,
        telefone,
        cidade,
        estado,
        profissao: profissao || null,
        interesse: OBJETIVO_LABEL[objetivo],
        origem: 'oportunidade-jan-rose',
        status: 'lead',
      });
    } catch (err) {
      /* segue o fluxo mesmo se o Supabase falhar — não bloqueia o lead */
    }
  }

  const wa = document.createElement('a');
  wa.href = WPP_GRUPO;
  wa.target = '_blank';
  wa.rel = 'noopener';
  document.body.appendChild(wa);
  wa.click();
  document.body.removeChild(wa);

  document.getElementById('modal-sucesso').classList.add('on');
  document.getElementById('form-comecar').reset();
  btn.disabled = false;
  btn.textContent = 'Quero dar o próximo passo →';
});

document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal-sucesso').classList.remove('on');
});
document.getElementById('modal-sucesso').addEventListener('click', (e) => {
  if (e.target.id === 'modal-sucesso') e.target.classList.remove('on');
});
