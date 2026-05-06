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
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ─── PROJECT SLIDER ──────────────────────────────── */
const slider = document.getElementById('projectsSlider');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
const dotsContainer = document.getElementById('sliderDots');

const cards = Array.from(slider.querySelectorAll('.project-card'));
const total = cards.length;
const VISIBLE = 3; // cards visible at once
const PAGES = total - VISIBLE + 1; // 6 - 3 + 1 = 4 pages
let current = 0;

// Build dots
for (let i = 0; i < PAGES; i++) {
  const dot = document.createElement('button');
  dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Strana ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
}

function updateSlider() {
  // Move cards: hide/show based on window of VISIBLE
  cards.forEach((card, i) => {
    const inView = i >= current && i < current + VISIBLE;
    card.style.display = inView ? '' : 'none';
  });

  // Update dots
  dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
  });

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current >= PAGES - 1;
}

function goTo(index) {
  current = Math.max(0, Math.min(index, PAGES - 1));
  updateSlider();
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));

updateSlider();

/* ─── PROJECT DATA ────────────────────────────────── */
const projects = {
  1: {
    type: 'Rodinný dům',
    title: 'Rodinná vila – Rožnov pod Radhoštěm',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    desc: [
      'Novostavba moderního rodinného domu o zastavěné ploše 220 m² v klidné lokalitě Rožnova pod Radhoštěm. Projekt zahrnuje kompletní výstavbu na klíč – od základů po finální dokončovací práce včetně interiérových úprav.',
      'Dům je navržen v moderním stylu s důrazem na energetickou úspornost. Součástí je prostorná terasa 45 m², garáž pro dva vozy a zahradní úpravy. Zahájení leden 2026, dokončení léto 2026.'
    ],
    details: { 'Typ stavby': 'Novostavba RD', 'Plocha': '220 m²', 'Zahájení': 'Leden 2026', 'Dokončení': 'Léto 2026', 'Lokalita': 'Rožnov pod R.', 'Stav': 'Probíhá' }
  },
  2: {
    type: 'Komerční stavba',
    title: 'Administrativní budova – Valašské Meziříčí',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
    desc: [
      'Výstavba třípodlažní administrativní budovy pro lokální podnikatelský subjekt. Celková užitná plocha 850 m², moderní otevřené kancelářské prostory, zasedací místnosti a zázemí pro zaměstnance.',
      'Budova splňuje přísné energetické standardy – tepelná čerpadla, fotovoltaika na střeše, řízené větrání. Zahájení únor 2026, předání podzim 2026.'
    ],
    details: { 'Typ stavby': 'Komerční budova', 'Plocha': '850 m²', 'Podlaží': '3', 'Zahájení': 'Únor 2026', 'Dokončení': 'Podzim 2026', 'Stav': 'Probíhá' }
  },
  3: {
    type: 'Rekonstrukce',
    title: 'Rekonstrukce bytového domu – Frenštát pod Radhoštěm',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    desc: [
      'Komplexní rekonstrukce panelového bytového domu z 80. let. Zateplení fasády kontaktním systémem, výměna oken a dveří, modernizace rozvodů elektřiny, vody a topení.',
      'Dále rekonstrukce společných prostor – chodby, schodiště, vstupní vestibul. Projekt ve fázi přípravy projektové dokumentace, zahájení prací léto 2026.'
    ],
    details: { 'Typ stavby': 'Rekonstrukce BD', 'Počet bytů': '24', 'Zahájení': 'Léto 2026', 'Dokončení': '2027', 'Lokalita': 'Frenštát pod R.', 'Stav': 'Příprava' }
  },
  4: {
    type: 'Průmyslová stavba',
    title: 'Skladová hala – Zubří',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    desc: [
      'Výstavba ocelové skladové haly o ploše 1 200 m² pro výrobní firmu v průmyslové zóně Zubří. Projekt realizován v plánovaném termínu, kompletně včetně venkovních úprav, zpevněných ploch a parkoviště.',
      'Hala splňuje požadavky na skladování průmyslového zboží – výška 8 m, nakládací rampy, samostatné sociální zázemí pro zaměstnance. Dokončeno 2025.'
    ],
    details: { 'Typ stavby': 'Skladová hala', 'Plocha': '1 200 m²', 'Výška': '8 m', 'Lokalita': 'Zubří', 'Dokončeno': '2025', 'Stav': 'Dokončeno' }
  },
  5: {
    type: 'Rekonstrukce',
    title: 'Rekonstrukce rodinného domu – Střítež nad Bečvou',
    img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80',
    desc: [
      'Kompletní rekonstrukce rodinného domu z 80. let ve Stříteži nad Bečvou. Práce zahrnovaly novou střechu s izolací, kompletní zateplení a fasádu, výměnu všech oken a dveří.',
      'Dále modernizace interiéru – nová koupelna, kuchyň, podlahy a elektroinstalace. Veškeré práce proběhly bez přerušení provozu domácnosti. Dokončeno na jaře 2025.'
    ],
    details: { 'Typ stavby': 'Rekonstrukce RD', 'Plocha': '145 m²', 'Lokalita': 'Střítež nad Bečvou', 'Dokončeno': 'Jaro 2025', 'Stav': 'Dokončeno' }
  },
  6: {
    type: 'Bytová výstavba',
    title: 'Bytový dům – Rožnov pod Radhoštěm',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    desc: [
      'Novostavba čtyřpodlažního bytového domu s 12 bytovými jednotkami různých dispozic (1+kk až 4+kk) v Rožnově pod Radhoštěm. Budova disponuje podzemními garážemi, výtahem a předzahrádkami.',
      'Každý byt má balkón nebo terasu, moderní technické vybavení a společné sklepy. Stavba předána klientovi a všechny jednotky prodány v roce 2024.'
    ],
    details: { 'Typ stavby': 'Bytový dům', 'Počet bytů': '12', 'Podlaží': '4 + 1PP', 'Lokalita': 'Rožnov pod R.', 'Dokončeno': '2024', 'Stav': 'Dokončeno' }
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
    </div>`).join('');
  modalContent.innerHTML = `
    <img class="modal-project-img" src="${p.img}" alt="${p.title}"/>
    <span class="modal-tag">${p.type}</span>
    <h2>${p.title}</h2>
    ${p.desc.map(d => `<p>${d}</p>`).join('')}
    <div class="modal-details">${detailsHTML}</div>`;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

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
