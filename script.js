// Smooth scrolling for nav links
const links = document.querySelectorAll('.nav-links a');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = document.querySelector(link.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });
});
