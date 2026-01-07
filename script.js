document.addEventListener('DOMContentLoaded', () => {
  const loaderTime = 3000; // 3 seconds
  const loader = document.querySelector('.loader');
  const content = document.getElementById('content');

  // Safety check
  if (!loader || !content) return;

  setTimeout(() => {
    // Stop the CSS animation (bars)
    loader.style.animation = 'none';

    // Force reflow for transition to work in all browsers
    loader.offsetHeight;

    // Animate: slide left, shrink, fade out
    loader.style.transform = 'translate(-3000%, -1000%) scale(0)';
    loader.style.opacity = '0';

    // Show main content
    content.style.display = 'block';
    setTimeout(() => {
      content.style.opacity = '1';
      content.style.transform = 'scale(1)';
    }, 100);

    // Remove loader after animation
    setTimeout(() => loader.remove(), 1000);
  }, loaderTime);

  // Smooth scroll for nav
  document.documentElement.style.scrollBehavior = 'smooth';

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('primary-navigation');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!links.contains(e.target) && e.target !== toggle) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  
    // Close menu when scrolling
    document.addEventListener('scroll', () => {
      if (links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
});
