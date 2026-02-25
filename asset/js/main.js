/* ============================================================
   FATTAH PORTFOLIO — MAIN JAVASCRIPT
   ============================================================ */

/* ─── Navbar scroll effect ───────────────────────────────── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

/* ─── Active nav link ────────────────────────────────────── */
(function setActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.link a, .hamburger-content a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ─── Hamburger (FIXED) ──────────────────────────────────── */
const hamburger = document.querySelector('.hamburger');
const dropdown  = document.querySelector('.dropdown');

hamburger?.addEventListener('click', () => {
  const isOpen = dropdown.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close when a link is clicked
document.querySelectorAll('.hamburger-content a').forEach(a => {
  a.addEventListener('click', () => {
    dropdown.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (dropdown && !dropdown.contains(e.target) && !hamburger.contains(e.target)) {
    dropdown.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ─── Scroll Reveal ──────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children if .reveal-group
      const el = entry.target;
      el.style.transitionDelay = el.dataset.delay || '0ms';
      el.classList.add('visible');
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  revealObserver.observe(el);
});

/* ─── Skill bar animation ────────────────────────────────── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const target = bar.dataset.level || '75';
        bar.style.width = target + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-grid')?.forEach(el => skillObserver.observe(el));

/* ─── Typewriter effect ──────────────────────────────────── */
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  const words = ['Student', 'Web Developer', 'Programmer', 'Creator', 'High Schooler'];
  let wordIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = words[wordIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 60 : 110;
    if (!isDeleting && charIndex === current.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 400;
    }
    setTimeout(type, speed);
  }
  type();
}

/* ─── Animated counter (stats) ──────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + (el.dataset.suffix || '');
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stats-row')?.forEach(el => counterObserver.observe(el));

/* ─── Toast notification ─────────────────────────────────── */
function showToast(msg, icon = 'fa-circle-check') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ─── Smooth page link clicks ────────────────────────────── */
document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', e => {
    // Let browser handle navigation naturally for multi-page sites
    // Add active transition class
    document.body.style.opacity = '0.98';
    setTimeout(() => document.body.style.opacity = '1', 300);
  });
});

/* ─── Image fallback ─────────────────────────────────────── */
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    this.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText =
      'width:100%;height:100%;display:flex;align-items:center;justify-content:center;' +
      'background:var(--surface2);color:var(--muted);font-size:2.5rem;border-radius:inherit;';
    placeholder.innerHTML = '<i class="fa-solid fa-image"></i>';
    this.parentNode.insertBefore(placeholder, this.nextSibling);
  });
});

/* ─── Mobile: close dropdown on resize ───────────────────── */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && dropdown) {
    dropdown.classList.remove('open');
    hamburger?.classList.remove('open');
    document.body.style.overflow = '';
  }
});