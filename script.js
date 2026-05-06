/* ─── SCROLL HEADER ───────────────────────────────── */
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});
 
/* ─── BURGER MENU ─────────────────────────────────── */
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});
 
/* ─── SMOOTH SCROLL ───────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
 
/* ─── PROJECT DATA ────────────────────────────────── */
const projects = {
  1: {
    type: 'Rodinný dům',
    title: 'Rodinná vila – Rožnov pod Radhoštěm',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    desc: [
      'Novostavba moderního rodinného domu o zastavěné ploše 220 m² v klidné lokalitě Rožnova pod Radhoštěm. Projekt zahrnuje kompletní výstavbu na klíč – od základů po finální dokončovací práce včetně interiérových úprav.',
      'Dům je navržen v moderním stylu s důrazem na energetickou úspornost. Součástí je prostorná terasa o ploše 45 m², garáž pro dva vozy a zahradní úpravy. Projekt byl zahájen v lednu 2026 a dokončení je plánováno na léto 2026.'
    ],
    details: {
      'Typ stavby': 'Novostavba RD',
      'Plocha': '220 m²',
      'Zahájení': 'Leden 2026',
      'Dokončení': 'Léto 2026',
      'Lokalita': 'Rožnov pod Radhoštěm',
      'Stav': 'Probíhá'
    }
  },
  2: {
    type: 'Komerční stavba',
    title: 'Administrativní budova – Valašské Meziříčí',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    desc: [
      'Výstavba třípodlažní administrativní budovy pro lokální podnikatelský subjekt ve Valašském Meziříčí. Celková užitná plocha budovy je 850 m². Projekt obsahuje moderní otevřené kancelářské prostory, zasedací místnosti a zázemí pro zaměstnance.',
      'Budova splňuje přísné energetické standardy a je vybavena systémem řízeného větrání, tepelnými čerpadly a fotovoltaickými panely na střeše. Projekt je realizován od února 2026, předání je plánováno na podzim 2026.'
    ],
    details: {
      'Typ stavby': 'Komerční budova',
      'Plocha': '850 m²',
      'Podlaží': '3',
      'Zahájení': 'Únor 2026',
      'Dokončení': 'Podzim 2026',
      'Stav': 'Probíhá'
    }
  },
  3: {
    type: 'Rekonstrukce',
    title: 'Rekonstrukce bytového domu – Frenštát pod Radhoštěm',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    desc: [
      'Komplexní rekonstrukce panelového bytového domu z 80. let ve Frenštátě pod Radhoštěm. Práce zahrnují kompletní zateplení fasády s kontaktním zateplovacím systémem, výměnu všech oken a dveří, modernizaci rozvodů elektřiny, vody a topení.',
      'Dále je plánována rekonstrukce společných prostor – chodeb, schodiště a vstupního vestibulu. Projekt je aktuálně ve fázi přípravy a projektové dokumentace, zahájení prací je naplánováno na léto 2026.'
    ],
    details: {
      'Typ stavby': 'Rekonstrukce BD',
      'Počet bytů': '24',
      'Zahájení': 'Léto 2026',
      'Dokončení': '2027',
      'Lokalita': 'Frenštát pod R.',
      'Stav': 'Příprava'
    }
  }
};
 
/* ─── MODAL ───────────────────────────────────────── */
const overlay = document.getElementById('modal-overlay');
const modalContent = document.getElementById('modal-content');
 
function openModal(id) {
  const p = projects[id];
  if (!p) return;
 
  const detailsHTML = Object.entries(p.details).map(([label, value]) => `
    <div class="modal-detail-item">
      <span class="modal-detail-label">${label}</span>
      <span class="modal-detail-value">${value}</span>
    </div>
  `).join('');
 
  modalContent.innerHTML = `
    <img class="modal-project-img" src="${p.img}" alt="${p.title}"/>
    <span class="modal-tag">${p.type}</span>
    <h2>${p.title}</h2>
    ${p.desc.map(d => `<p>${d}</p>`).join('')}
    <div class="modal-details">${detailsHTML}</div>
  `;
 
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
 
function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}
 
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
 
/* ─── REVEAL ON SCROLL ────────────────────────────── */
const revealEls = document.querySelectorAll('.project-card, .job-card, .contact-item, .stat, .strip-item');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
 
revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity 0.5s ${i * 0.06}s ease, transform 0.5s ${i * 0.06}s ease`;
  revealObserver.observe(el);
});