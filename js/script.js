// ============================================================
// PROFESSIONAL PORTFOLIO - INTERACTIVE FEATURES
// ============================================================

// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 70; // Navbar height
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      updateActiveNav(this.getAttribute('href'));
    }
  });
});

// ===== UPDATE ACTIVE NAV LINK =====
function updateActiveNav(currentId) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentId) {
      link.classList.add('active');
    }
  });
}

// ===== THEME TOGGLE =====
themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update toggle button
  themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
});

// ===== LOAD SAVED THEME =====
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.portfolio-card, .testimonial-card, .stat-item').forEach(el => {
  el.classList.remove('reveal');
  observer.observe(el);
});

// ===== FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
    };
    
    try {
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      submitBtn.textContent = '✓ Message Sent!';
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert('An error occurred. Please try again.');
    }
  });
}

// ===== SCROLL TO ACTIVE SECTION =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      updateActiveNav(`#${section.id}`);
    }
  });
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero');
  
  if (hero) {
    hero.style.backgroundPosition = `0px ${scrolled * 0.5}px`;
  }
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const stats = document.querySelectorAll('.stat-item h3');
  
  stats.forEach(stat => {
    const target = stat.textContent;
    let current = 0;
    
    // Skip animation for non-numeric values
    if (isNaN(parseInt(target))) return;
    
    const increment = parseInt(target) / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= parseInt(target)) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current) + '+';
      }
    }, 30);
  });
}

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsSection);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search (future feature)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    // Focus search when implemented
  }
  
  // Esc to toggle nav on mobile
  if (e.key === 'Escape') {
    // Close mobile menu when implemented
  }
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== ACCESSIBILITY: FOCUS VISIBLE =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-focus');
  }
});

document.addEventListener('click', () => {
  document.body.classList.remove('keyboard-focus');
});

// ===== INITIALIZE =====
loadTheme();

console.log('%cWelcome to Nuru Amudi\'s Portfolio!', 'color: #1e40af; font-size: 20px; font-weight: bold;');
console.log('%cLet\'s build something amazing together! 🚀', 'color: #0891b2; font-size: 14px;');
