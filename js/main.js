/**
 * AETHERA STUDIO - Main JavaScript Controller
 * Navigation, Smooth Scroll, Accordions, Form Modal, & Interactive State
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initServiceAccordion();
  initContactModal();
});

/* Sticky Navigation Bar Scroll Handler */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* Animated Mobile Navigation Drawer */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (!menuBtn || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove('mobile-active');
    menuBtn.textContent = '☰';
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMenu() {
    navLinks.classList.add('mobile-active');
    menuBtn.textContent = '✕';
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isExpanded = navLinks.classList.contains('mobile-active');
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMenu();
    }
  });
}

/* Editorial Services Accordion List */
function initServiceAccordion() {
  const serviceItems = document.querySelectorAll('.service-item');
  if (!serviceItems.length) return;

  serviceItems.forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      serviceItems.forEach(other => other.classList.remove('active'));

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* Contact / Start Project Modal Controller */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');
  const triggers = document.querySelectorAll('[data-modal-target="contact"]');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
}
