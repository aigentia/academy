// main.js — scroll reveal, nav hamburger, accordion, cookie banner

// Scroll reveal
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  }),
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Nav hamburger
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('navClose');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
}
if (mobileClose && mobileMenu) {
  mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}

document.querySelectorAll('.nav-mobile-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileMenu) mobileMenu.classList.remove('open');
  });
});

// Accordion
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('open');
  });
});

// Cookie banner
const cookieBanner = document.getElementById('cookieBanner');
const cookieDismiss = document.getElementById('cookieDismiss');

if (cookieBanner) {
  if (localStorage.getItem('aima_cookie_accepted')) {
    cookieBanner.classList.add('hidden');
  }
  if (cookieDismiss) {
    cookieDismiss.addEventListener('click', () => {
      cookieBanner.classList.add('hidden');
      localStorage.setItem('aima_cookie_accepted', '1');
    });
  }
}

// Lucide icons
if (typeof lucide !== 'undefined') {
  lucide.createIcons();
}
