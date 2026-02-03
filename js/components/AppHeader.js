class AppHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const activePage = this.getAttribute('active') || '';
    if (this.getAttribute('variant') === 'minimal') {
      this.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <nav class="nav" id="navbar">
                <div class="nav-inner">
                    <a href="./" class="logo">
                        <div style="position: relative;">
                            <div class="logo-full">
                                <img src="images/AUZA Wordmark White.webp" alt="AUZA - Functional Design Studio" width="100" height="25" decoding="async">
                            </div>
                        </div>
                    </a>
                    <div class="nav-links">
                        <a href="./" class="nav-link">Back to Home</a>
                    </div>
                </div>
            </nav>
            `;
      this.initScrollEffect();
      return;
    }

    this.innerHTML = `
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <nav class="nav" id="navbar">
    <div class="nav-inner">
      <a href="./" class="logo">
        <div style="position: relative;">
          <div class="logo-full">
            <img src="images/AUZA Wordmark White.webp" alt="AUZA - Functional Design Studio" width="100" height="25" decoding="async">
          </div>
          <div class="logo-compact">
            <img src="images/AUZA Logo White.webp" alt="AUZA" width="25" height="25" decoding="async">
          </div>
        </div>
      </a>
      <div class="nav-links">
        <a href="./#work" class="nav-link">Work</a>
        <a href="services" class="nav-link ${activePage === 'services' ? 'active' : ''}" ${activePage === 'services' ? 'aria-current="page"' : ''}>Services</a>
        <a href="about" class="nav-link ${activePage === 'about' ? 'active' : ''}" ${activePage === 'about' ? 'aria-current="page"' : ''}>About</a>
        <a href="./#contact" class="nav-link">Contact</a>
      </div>
      <button class="mobile-menu-btn" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <div class="mobile-menu">
    <div class="mobile-menu-inner">
      <a href="./#work" class="mobile-nav-link">Work</a>
      <a href="services" class="mobile-nav-link">Services</a>
      <a href="about" class="mobile-nav-link">About</a>
      <a href="./#contact" class="mobile-nav-link">Contact</a>
      <a href="./#contact" class="mobile-nav-link highlight">Book Free 30-Min Consultation →</a>
    </div>
  </div>
        `;

    this.initMobileMenu();
    this.initScrollEffect();
  }

  initMobileMenu() {
    const mobileMenuBtn = this.querySelector('.mobile-menu-btn');
    const mobileMenu = this.querySelector('.mobile-menu');
    const mobileLinks = this.querySelectorAll('.mobile-nav-link');
    const focusableElements = mobileMenu.querySelectorAll('a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        document.body.style.overflow = isExpanded ? 'hidden' : '';

        if (isExpanded) {
          // Trap focus logic
          firstFocusableElement.focus();
          mobileMenu.addEventListener('keydown', this.handleTabKey);
        } else {
          mobileMenuBtn.focus();
          mobileMenu.removeEventListener('keydown', this.handleTabKey);
        }
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
          mobileMenu.removeEventListener('keydown', this.handleTabKey);
        });
      });
    }
  }

  handleTabKey = (e) => {
    const mobileMenu = this.querySelector('.mobile-menu');
    const focusableElements = mobileMenu.querySelectorAll('a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) { // shift + tab
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      } else { // tab
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }
    if (e.key === 'Escape') {
      const mobileMenuBtn = this.querySelector('.mobile-menu-btn');
      mobileMenuBtn.click(); // Close menu
    }
  }

  initScrollEffect() {
    const navbar = this.querySelector('#navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80)
    });
  }
}

customElements.define('app-header', AppHeader);
