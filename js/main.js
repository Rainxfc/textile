// ============================================================
// PRESTIGE TEXTILES — Main JavaScript
// Delivering Quality. Building Trust.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar Scroll Effect ───
  const navbar = document.querySelector('.navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ─── Active Nav Link ───
  const navLinks = document.querySelectorAll('.nav-link[data-page]');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    if (link.getAttribute('data-page') === currentPage) {
      link.classList.add('active');
    }
  });

  // ─── Mobile Menu ───
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Scroll Reveal ───
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ─── Counter Animation ───
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const duration = 2000;
        const isDecimal = target % 1 !== 0;
        let startTime = null;

        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = eased * target;
          el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = prefix + target + suffix;
        };

        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => counterObserver.observe(el));

  // ─── Hero Background Loaded ───
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const bgImage = heroBg.style.backgroundImage;
    if (bgImage) {
      const urlMatch = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
      if (urlMatch) {
        const img = new Image();
        img.onload = () => heroBg.classList.add('loaded');
        img.src = urlMatch[1];
      }
    }
    // Add loaded class after a short delay as fallback
    setTimeout(() => heroBg.classList.add('loaded'), 300);
  }

  // ─── Back to Top ───
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ─── Accordion ───
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ─── Lightbox ───
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  document.querySelectorAll('.gallery-item[data-src]').forEach(item => {
    item.addEventListener('click', () => {
      if (lightboxImg) lightboxImg.src = item.getAttribute('data-src');
      lightbox?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  const closeLightbox = () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  };
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // ─── Contact Form ───
  const contactForm = document.querySelector('#inquiry-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent — We\'ll respond within 24 hours';
      btn.style.background = '#166534';
      btn.style.color = '#fff';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        contactForm.reset();
      }, 5000);
    });
  }

  // ─── Newsletter Form ───
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      btn.textContent = '✓ Subscribed!';
      btn.style.background = '#166534';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        btn.style.color = '';
        input.value = '';
      }, 3000);
    });
  });

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  });

  // ─── Product Filter (Products Page) ───
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.filterable-card');
  if (filterBtns.length && productCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        productCards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filter === 'all' || cat === filter) {
            card.style.display = '';
            card.style.animation = 'fadeIn 0.3s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ─── Tab Component ───
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('.tab-group');
      if (!tabGroup) return;
      tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      tabGroup.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const pane = tabGroup.querySelector(`#${btn.getAttribute('data-tab')}`);
      pane?.classList.add('active');
    });
  });

  // ─── World Map Country Highlight ───
  initWorldMap();

  // ─── Sticky Header Offset for anchor links ───
  const navHeight = navbar?.offsetHeight || 72;
  document.documentElement.style.setProperty('--nav-height', navHeight + 'px');

});

// ─── World Map Logic ───
function initWorldMap() {
  const highlightCountries = [
    'AU', 'NZ', 'GB', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE',
    'AE', 'SA', 'QA', 'US', 'CA'
  ];

  const countryNames = {
    AU: 'Australia', NZ: 'New Zealand', GB: 'United Kingdom',
    DE: 'Germany', FR: 'France', ES: 'Spain', IT: 'Italy',
    NL: 'Netherlands', BE: 'Belgium', AE: 'UAE', SA: 'Saudi Arabia',
    QA: 'Qatar', US: 'United States', CA: 'Canada'
  };

  const countries = document.querySelectorAll('#world-map-svg .country');
  countries.forEach(country => {
    const code = country.getAttribute('data-code');
    if (highlightCountries.includes(code)) {
      country.classList.add('highlight');
      country.setAttribute('title', countryNames[code] || code);

      const tooltip = document.createElement('title');
      tooltip.textContent = countryNames[code] || code;
      country.appendChild(tooltip);
    }
  });
}

// ─── Utility: Format Numbers ───
function formatNumber(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
