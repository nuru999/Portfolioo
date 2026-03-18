let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navlinks = document.querySelectorAll('header nav a');
let darkModeIcon = document.querySelector('#darkMode-icon');

// Active link on scroll
window.onscroll = () => {
  let top = window.scrollY;

  sections.forEach(sec => {
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navlinks.forEach(link => {
        link.classList.remove('active');
        let currentLink = document.querySelector('header nav a[href*="' + id + '"]');
        if (currentLink) {
          currentLink.classList.add('active');
        }
      });
    }
  });

  // Close mobile navbar on scroll
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

// Toggle mobile menu
menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
});

// Toggle dark mode
if (darkModeIcon) {
  darkModeIcon.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeIcon.classList.toggle('bx-sun');
  });
}
