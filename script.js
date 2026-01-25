const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 80) });
const processData = [
  { num: '01', title: 'Discover', desc: 'We immerse ourselves in your business through workshops, stakeholder interviews, and competitive analysis. Understanding precedes design.' },
  { num: '02', title: 'Strategise', desc: 'Research becomes direction. We define information architecture, content strategy, and visual approach before any design work begins.' },
  { num: '03', title: 'Design', desc: 'Strategy transforms into high-fidelity designs. Iterative feedback ensures alignment at every stage from wireframes to final visuals.' },
  { num: '04', title: 'Develop', desc: 'Clean code, optimized performance, accessibility baked in. We build on modern platforms with your growth in mind.' },
  { num: '05', title: 'Launch', desc: 'Coordinated deployment, thorough QA, and post-launch monitoring. We ensure everything performs perfectly in production.' }
];
const steps = document.querySelectorAll('.process-step');
const detailNum = document.getElementById('detail-num');
const detailTitle = document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');
steps.forEach((step, i) => {
  step.addEventListener('click', () => {
    steps.forEach(s => s.classList.remove('active'));
    step.classList.add('active');
    const d = processData[i];
    detailNum.textContent = d.num;
    detailTitle.textContent = d.title;
    detailDesc.textContent = d.desc;

    // Mobile - Scroll to detail card
    if (window.innerWidth <= 768) {
      document.getElementById('detail-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}
// Hero Mouse Glow Effect
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    hero.style.setProperty('--mouse-x', `${x}px`);
    hero.style.setProperty('--mouse-y', `${y}px`);
  });
}

// Scroll Indicator Fade Out
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      scrollIndicator.classList.add('hidden');
    } else {
      scrollIndicator.classList.remove('hidden');
    }
  });

  scrollIndicator.addEventListener('click', () => {
    // Scroll to the next section or just a bit down
    const workSection = document.getElementById('work'); // Assuming work is next or roughly next
    // Or just a viewport height
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
}

// AJAX Form Submission
const contactForm = document.querySelector('form.form-grid');
const toast = document.getElementById('toast');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Success
          showToast();
          contactForm.reset();
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Reload after 2 seconds
        } else {
          // Error
          alert('Oops! There was a problem submitting your form. Please try again.');
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Oops! There was a problem submitting your form. Please try again.');
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}

function showToast() {
  if (toast) {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}

// Go to Top Button Implementation
document.addEventListener('DOMContentLoaded', () => {
  const goTopBtn = document.createElement('div');
  goTopBtn.className = 'go-to-top';
  goTopBtn.setAttribute('aria-label', 'Go to top');
  goTopBtn.setAttribute('role', 'button');
  goTopBtn.innerHTML = `
    <svg viewBox="0 0 24 24">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  `;
  document.body.appendChild(goTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      goTopBtn.classList.add('visible');
    } else {
      goTopBtn.classList.remove('visible');
    }
  });

  goTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
