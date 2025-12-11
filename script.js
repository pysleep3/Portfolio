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

// About image upload preview
const aboutInput = document.getElementById('about-image-input');
const aboutImage = document.getElementById('about-image');

if (aboutInput && aboutImage) {
  aboutInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    aboutImage.src = url;
    // revoke object URL later to free memory
    aboutImage.onload = () => URL.revokeObjectURL(url);
  });
}

// Project video upload previews
document.querySelectorAll('.project-video-input').forEach((input, idx) => {
  input.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // Find the nearest video element in the same project-card
    const card = input.closest('.project-card');
    const video = card ? card.querySelector('.project-video') : null;
    if (!video) return;
    const url = URL.createObjectURL(file);
    video.src = url;
    video.load();
    // revoke later when video metadata loaded to free memory
    video.onloadeddata = () => URL.revokeObjectURL(url);
  });
});
