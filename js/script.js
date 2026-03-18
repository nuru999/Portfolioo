// script.js - Portfolio Interactive Features
(() => {
  'use strict';
  
  // DOM Elements - FIXED SELECTORS to match your HTML
  const elements = {
    navToggle: document.querySelector('.nav-toggle'),
    navLinks: document.querySelector('.nav-links'),
    sections: document.querySelectorAll('section'),
    navLinksItems: document.querySelectorAll('.nav-links a'),
    contactForm: document.querySelector('#contactForm'),
    currentYear: document.querySelector('#year'),
    toast: document.querySelector('#toast'),
    cursor: document.querySelector('.cursor'),
    cursorFollower: document.querySelector('.cursor-follower')
  };

  // Initialize
  const init = () => {
    updateCopyrightYear();
    initMobileNav();
    initSmoothScroll();
    initScrollSpy();
    initFormHandling();
    initCustomCursor();
    initTypewriter();
    initRevealAnimations();
    initStatsCounter();
  };

  // Update copyright year
  const updateCopyrightYear = () => {
    if (elements.currentYear) {
      elements.currentYear.textContent = new Date().getFullYear();
    }
  };

  // Mobile navigation - FIXED
  const initMobileNav = () => {
    if (!elements.navToggle || !elements.navLinks) return;
    
    elements.navToggle.addEventListener('click', () => {
      elements.navLinks.classList.toggle('active');
      const isActive = elements.navLinks.classList.contains('active');
      elements.navToggle.setAttribute('aria-expanded', isActive);
      
      // Animate hamburger to X
      const spans = elements.navToggle.querySelectorAll('span');
      if (isActive) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close on link click
    elements.navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        elements.navLinks.classList.remove('active');
        const spans = elements.navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  };

  // Smooth scroll for anchors
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, null, anchor.getAttribute('href'));
        }
      });
    });
  };

  // Scroll spy for active nav links
  const initScrollSpy = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          elements.navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    elements.sections.forEach(section => observer.observe(section));
  };

  // Typewriter effect
  const initTypewriter = () => {
    const typewriterText = document.querySelector('.typewriter-text');
    if (!typewriterText) return;
    
    const words = typewriterText.dataset.words.split(',');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    const type = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        typewriterText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
      }
      
      setTimeout(type, typeSpeed);
    };
    
    type();
  };

  // Reveal animations on scroll
  const initRevealAnimations = () => {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    reveals.forEach(el => revealObserver.observe(el));
  };

  // Stats counter animation
  const initStatsCounter = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          
          const counter = setInterval(() => {
            current += step;
            if (current >= target) {
              entry.target.textContent = target;
              clearInterval(counter);
            } else {
              entry.target.textContent = Math.floor(current);
            }
          }, 16);
          
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => statsObserver.observe(stat));
  };

  // Custom cursor
  const initCustomCursor = () => {
    if (!elements.cursor || !elements.cursorFollower) return;
    
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    document.addEventListener('mousemove', (e) => {
      elements.cursor.style.left = e.clientX + 'px';
      elements.cursor.style.top = e.clientY + 'px';
      
      setTimeout(() => {
        elements.cursorFollower.style.left = e.clientX + 'px';
        elements.cursorFollower.style.top = e.clientY + 'px';
      }, 100);
    });
    
    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        elements.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        elements.cursorFollower.style.background = 'rgba(0, 255, 238, 0.1)';
      });
      el.addEventListener('mouseleave', () => {
        elements.cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        elements.cursorFollower.style.background = 'transparent';
      });
    });
  };

  // Contact form handling
  const initFormHandling = () => {
    if (!elements.contactForm) return;
    
    elements.contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = elements.contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
      
      // Simulate sending (replace with actual fetch)
      await new Promise(r => setTimeout(r, 1500));
      
      showToast('Message sent successfully!');
      elements.contactForm.reset();
      
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    });
  };

  // Toast notification
  const showToast = (message) => {
    if (!elements.toast) return;
    
    elements.toast.querySelector('span').textContent = message;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 3000);
  };

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();