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
const VISIBLE = 3;
const PAGES = total - VISIBLE + 1;
let current = 0;

for (let i = 0; i < PAGES; i++) {
  const dot = document.createElement('button');
  dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Strana ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
}

function updateSlider() {
  cards.forEach((card, i) => {
    card.style.display = (i >= current && i < current + VISIBLE) ? '' : 'none';
  });
  dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === current);
  });
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current >= PAGES - 1;
}

function goTo(index) {
  current = Math.max(0, Math.min(index, PAGES - 1));
  // Close any open mini popup when sliding
  closeAllMinis();
  updateSlider();
}

prevBtn.addEventListener('click', () => goTo(current - 1));
nextBtn.addEventListener('click', () => goTo(current + 1));
updateSlider();

/* ─── MINI POPUP ──────────────────────────────────── */
let activeBtn = null;

function closeAllMinis() {
  document.querySelectorAll('.mini-popup.open').forEach(p => p.classList.remove('open'));
  document.querySelectorAll('.project-info-btn.active').forEach(b => {
    b.classList.remove('active');
    b.textContent = 'Více informací ↓';
  });
  activeBtn = null;
}

function openMini(id, btn) {
  const popup = document.getElementById('mini-' + id);
  const isOpen = popup.classList.contains('open');

  // Close all first
  closeAllMinis();

  if (!isOpen) {
    popup.classList.add('open');
    btn.classList.add('active');
    btn.textContent = 'Méně informací ↑';
    activeBtn = btn;
  }
}

// Close mini popup when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.project-card')) {
    closeAllMinis();
  }
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