/**
 * AETHERA STUDIO - Motion & Animation Engine
 * Custom Interactive Cursor Follower, Scroll Reveal Observer, & Metric Counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initScrollReveal();
  initCounterAnimations();
  initProcessScrollHighlight();
});

/* Custom Interactive Cursor Follower */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor || window.innerWidth <= 1024) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    requestAnimationFrame(renderCursor);
  }

  renderCursor();

  // Hover states over project cards
  const projectCards = document.querySelectorAll('.work-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.add('view-mode');
      cursor.textContent = 'VIEW';
    });
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('view-mode');
      cursor.textContent = '';
    });
  });

  // Hover states over buttons and links
  const interactables = document.querySelectorAll('a, button, .service-item');
  interactables.forEach(el => {
    if (el.classList.contains('work-card')) return;
    el.addEventListener('mouseenter', () => cursor.classList.add('hover-mode'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover-mode'));
  });
}

/* IntersectionObserver Scroll Reveal Animations */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* Metric Counter Animations */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endVal = parseFloat(target.dataset.target);
        const prefix = target.dataset.prefix || '';
        const suffix = target.dataset.suffix || '';
        
        animateCount(target, 0, endVal, 1800, prefix, suffix);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
}

function animateCount(el, start, end, duration, prefix, suffix) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(start + easeProgress * (end - start));
    
    el.textContent = `${prefix}${currentVal}${suffix}`;
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}

/* Process Step Scroll Highlight */
function initProcessScrollHighlight() {
  const processCards = document.querySelectorAll('.process-card');
  if (!processCards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        processCards.forEach(c => c.style.borderColor = 'var(--border-light)');
        entry.target.style.borderColor = 'var(--color-accent)';
      }
    });
  }, { threshold: 0.5 });

  processCards.forEach(card => observer.observe(card));
}
