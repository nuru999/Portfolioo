// ============================================================
// PROFESSIONAL PORTFOLIO - INTERACTIVE FEATURES
// ============================================================
const navbar = document.querySelector('.navbar') || document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
window.addEventListener('scroll', () => { if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50); });
const anchors = document.querySelectorAll('a[href^="#"]');
anchors.forEach(anchor => { anchor.addEventListener('click', function (e) { e.preventDefault(); const target = document.querySelector(this.getAttribute('href')); if (target) window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' }); updateActiveNav(this.getAttribute('href')); }); });
function updateActiveNav(currentId) { document.querySelectorAll('.nav-links a, a[href^="#"]').forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === currentId) link.classList.add('active'); }); }
if (themeToggle) themeToggle.addEventListener('click', () => { const currentTheme = html.getAttribute('data-theme'); const newTheme = currentTheme === 'light' ? 'dark' : 'light'; html.setAttribute('data-theme', newTheme); localStorage.setItem('theme', newTheme); themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️'; });
function loadTheme() { const savedTheme = localStorage.getItem('theme') || 'light'; html.setAttribute('data-theme', savedTheme); if (themeToggle) themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️'; }
const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
document.querySelectorAll('.portfolio-card, .testimonial-card, .stat-item').forEach(el => { el.classList.remove('reveal'); observer.observe(el); });
const contactForm = document.querySelector('.contact-form');
if (contactForm) contactForm.addEventListener('submit', async (e) => { e.preventDefault(); try { const submitBtn = contactForm.querySelector('button[type="submit"]'); const originalText = submitBtn.textContent; submitBtn.textContent = 'Sending...'; submitBtn.disabled = true; await new Promise(resolve => setTimeout(resolve, 1500)); submitBtn.textContent = '✓ Message Sent!'; contactForm.reset(); setTimeout(() => { submitBtn.textContent = originalText; submitBtn.disabled = false; }, 3000); } catch (error) { console.error('Form submission error:', error); alert('An error occurred. Please try again.'); } });
window.addEventListener('scroll', () => { const sections = document.querySelectorAll('section[id]'); const scrollPosition = window.scrollY + 100; sections.forEach(section => { const sectionTop = section.offsetTop; const sectionHeight = section.offsetHeight; if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) updateActiveNav(`#${section.id}`); }); });
function animateCounters() { document.querySelectorAll('.stat-item h3').forEach(stat => { const target = stat.textContent; let current = 0; if (isNaN(parseInt(target))) return; const increment = parseInt(target) / 30; const timer = setInterval(() => { current += increment; if (current >= parseInt(target)) { stat.textContent = target; clearInterval(timer); } else { stat.textContent = Math.floor(current) + '+'; } }, 30); }); }
const statsSection = document.querySelector('.stats');
if (statsSection) { const statsObserver = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { animateCounters(); statsObserver.unobserve(entry.target); } }); }, { threshold: 0.5 }); statsObserver.observe(statsSection); }
loadTheme();
console.log('%cWelcome to Nuru Amudi\'s Portfolio!', 'color: #1e40af; font-size: 20px; font-weight: bold;');
console.log('%cLet\'s build something amazing together! 🚀', 'color: #0891b2; font-size: 14px;');
