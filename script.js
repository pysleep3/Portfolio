// Small script: enable smooth scrolling and mobile nav toggle
document.documentElement.style.scrollBehavior = 'smooth';

// Mobile nav toggle behavior
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('primary-navigation');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a navigation link is clicked (mobile)
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      if (links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    })
  );

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}
