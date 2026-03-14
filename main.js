/* ============================================================
   UNIVERSAL CAFE — Premium JavaScript
   Features: Dark Mode, Navbar, Carousel, Menu Tabs,
   Gallery, Form Validation, Scroll Animations
   ============================================================ */

'use strict';

/* ---------- DOM Ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNavbar();
  initHeroCarousel();
  initMenuTabs();
  initScrollReveal();
  initReservationForm();
  initScrollTop();
  initCounters();
});

/* ============================================================
   1. DARK MODE
   ============================================================ */
function initDarkMode() {
  const toggle = document.getElementById('darkToggle');
  const root   = document.documentElement;
  const stored = localStorage.getItem('uc-theme') || 'light';

  // Apply saved preference
  root.setAttribute('data-theme', stored);

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('uc-theme', next);

    // Announce to screen readers
    toggle.setAttribute('aria-label', `Switch to ${current} mode`);
  });

  // Respect OS preference if no stored value
  if (!localStorage.getItem('uc-theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('uc-theme', 'dark');
    }
  }
}

/* ============================================================
   2. NAVBAR — sticky, scroll-class, mobile menu
   ============================================================ */
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Scroll class
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile menu toggle
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
      }
    });
  }
}

/* ============================================================
   3. HERO CAROUSEL
   ============================================================ */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current  = 0;
  let interval = null;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }

  // Auto-play
  function startAuto() { interval = setInterval(next, 5500); }
  function stopAuto()  { clearInterval(interval); }

  startAuto();

  // Dot clicks
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAuto();
      goTo(i);
      startAuto();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { stopAuto(); next(); startAuto(); }
    if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); startAuto(); }
  });

  // Touch/swipe support
  let touchStartX = 0;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) {
        stopAuto();
        if (dx < 0) next(); else goTo(current - 1);
        startAuto();
      }
    });
  }

  // Init first slide
  slides[0].classList.add('active');
  dots[0]?.classList.add('active');
}

/* ============================================================
   4. MENU TABS
   ============================================================ */
function initMenuTabs() {
  const tabs       = document.querySelectorAll('.menu-tab');
  const categories = document.querySelectorAll('.menu-category');

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show matching category
      categories.forEach(cat => {
        const isActive = cat.id === target;
        cat.classList.toggle('active', isActive);
      });
    });
  });

  // Activate first tab
  if (tabs[0]) tabs[0].click();
}

/* ============================================================
   5. SCROLL REVEAL ANIMATION
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grid items
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  elements.forEach((el, i) => {
    // Auto-assign stagger delays to grid children
    const parent = el.parentElement;
    if (parent && parent.children.length > 1) {
      const idx = Array.from(parent.children).indexOf(el);
      el.dataset.delay = idx * 80;
    }
    observer.observe(el);
  });
}

/* ============================================================
   6. RESERVATION FORM VALIDATION
   ============================================================ */
function initReservationForm() {
  const form    = document.getElementById('reservationForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate API call (replace with real Spring Boot endpoint)
    try {
      // Replace URL with your Spring Boot backend:
      // await fetch('/api/reservations', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(getFormData(form))
      // });

      await fakeDelay(1500);

      form.style.display = 'none';
      success.style.display = 'block';

    } catch (err) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Reserve My Table';
      showFormError('Something went wrong. Please try again or call us directly.');
    }
  });
}

function validateForm(form) {
  let valid = true;
  const required = form.querySelectorAll('[required]');

  required.forEach(field => {
    clearError(field);
    if (!field.value.trim()) {
      showError(field, 'This field is required');
      valid = false;
    }
  });

  // Email validation
  const email = form.querySelector('[type="email"]');
  if (email && email.value && !isValidEmail(email.value)) {
    showError(email, 'Please enter a valid email address');
    valid = false;
  }

  // Phone validation
  const phone = form.querySelector('[type="tel"]');
  if (phone && phone.value && !isValidPhone(phone.value)) {
    showError(phone, 'Please enter a valid 10-digit phone number');
    valid = false;
  }

  // Date validation — must not be in the past
  const date = form.querySelector('[type="date"]');
  if (date && date.value) {
    const selected = new Date(date.value);
    const today    = new Date(); today.setHours(0,0,0,0);
    if (selected < today) {
      showError(date, 'Please select a future date');
      valid = false;
    }
  }

  return valid;
}

function showError(field, msg) {
  field.style.borderColor = '#EF4444';
  const err = document.createElement('span');
  err.className = 'field-error';
  err.style.cssText = 'color:#EF4444;font-size:0.75rem;margin-top:0.25rem;display:block;';
  err.textContent = msg;
  field.parentNode.appendChild(err);
}

function clearError(field) {
  field.style.borderColor = '';
  const existing = field.parentNode.querySelector('.field-error');
  if (existing) existing.remove();
}

function showFormError(msg) {
  const box = document.createElement('div');
  box.style.cssText = 'background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.4);color:#FCA5A5;padding:1rem;border-radius:8px;margin-top:1rem;font-size:0.9rem;';
  box.textContent = msg;
  document.getElementById('reservationForm').appendChild(box);
  setTimeout(() => box.remove(), 5000);
}

function getFormData(form) {
  const data = {};
  new FormData(form).forEach((v, k) => { data[k] = v; });
  return data;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
}
function fakeDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ============================================================
   7. SCROLL TO TOP
   ============================================================ */
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   8. ANIMATED COUNTERS (stats section)
   ============================================================ */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target   = parseInt(el.dataset.count, 10);
  const duration = 1800;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ============================================================
   9. GALLERY LIGHTBOX
   ============================================================ */
document.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery-item');
  if (item) openLightbox(item);

  if (e.target.closest('.lightbox-close') || e.target.classList.contains('lightbox')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function openLightbox(item) {
  const lb = document.getElementById('lightbox');
  const content = document.getElementById('lightboxContent');
  if (!lb || !content) return;

  const emoji = item.querySelector('.gallery-emoji')?.textContent || '☕';
  const label = item.querySelector('.gallery-label')?.textContent || '';
  const bgStyle = window.getComputedStyle(item.querySelector('.gallery-bg'));

  content.innerHTML = `
    <div style="
      width: min(80vw, 600px);
      height: min(80vh, 450px);
      border-radius: 16px;
      background: ${bgStyle.background || 'linear-gradient(135deg, #4E342E, #8A9A5B)'};
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;
      position: relative;
    ">
      <div style="font-size: 8rem; opacity: 0.5;">${emoji}</div>
      <div style="color: white; font-size: 1.2rem; font-family: Georgia, serif; font-weight: 600;">${label}</div>
    </div>
  `;

  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   10. SMOOTH ACTIVE NAV LINK (on scroll)
   ============================================================ */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  let found      = '';

  sections.forEach(section => {
    const top    = section.getBoundingClientRect().top;
    const height = section.offsetHeight;
    if (top <= 90 && top + height > 90) {
      found = section.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${found}`) {
      link.style.color = 'var(--color-olive)';
    } else {
      link.style.color = '';
    }
  });
}, { passive: true });
