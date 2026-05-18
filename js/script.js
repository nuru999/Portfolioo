const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function updateActiveNav(currentId) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === currentId);
  });
}

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 72, behavior: 'smooth' });
    updateActiveNav(href);
  });
});

function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  if (themeToggle) themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    themeToggle.textContent = nextTheme === 'light' ? '🌙' : '☀️';
  });
}

const revealItems = document.querySelectorAll('.portfolio-card, .testimonial-card, .stat-item, .timeline-item, .evolution-stage, .skill-item');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(18px)';
  item.style.transition = 'opacity .45s ease, transform .45s ease';
  observer.observe(item);
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    await new Promise(resolve => setTimeout(resolve, 1200));
    submitBtn.textContent = 'Message Sent';
    contactForm.reset();
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 2200);
  });
}

loadTheme();
updateActiveNav('#home');