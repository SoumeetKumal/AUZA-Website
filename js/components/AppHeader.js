class AppHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const activePage = this.getAttribute('active') || '';
    if (this.getAttribute('variant') === 'minimal') {
      this.innerHTML = `
            <nav class="nav" id="navbar">
                <div class="nav-inner">
                    <a href="index.html" class="logo">
                        <div style="position: relative;">
                            <div class="logo-full">
                                <img src="images/AUZA Wordmark White.png" alt="AUZA - Functional Design Studio" width="100">
                            </div>
                        </div>
                    </a>
                    <div class="nav-links">
                        <a href="index.html" class="nav-link">Back to Home</a>
                    </div>
                </div>
            </nav>
            `;
      this.initScrollEffect();
      return;
    }

    this.innerHTML = `
    <nav class="nav" id="navbar">
    <div class="nav-inner">
      <a href="index.html" class="logo">
        <div style="position: relative;">
          <div class="logo-full">
            <img src="images/AUZA Wordmark White.png" alt="AUZA - Functional Design Studio" width="100">
          </div>
          <div class="logo-compact">
            <img src="images/AUZA Logo White.png" alt="AUZA" width="25">
          </div>
        </div>
      </a>
      <div class="nav-links">
        <a href="index.html#work" class="nav-link">Work</a>
        <a href="services.html" class="nav-link ${activePage === 'services' ? 'active' : ''}">Services</a>
        <a href="about.html" class="nav-link ${activePage === 'about' ? 'active' : ''}">About</a>
        <a href="index.html#contact" class="nav-link">Contact</a>
      </div>
      <button class="mobile-menu-btn" aria-label="Toggle menu">
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <div class="mobile-menu">
    <div class="mobile-menu-inner">
      <a href="index.html#work" class="mobile-nav-link">Work</a>
      <a href="services.html" class="mobile-nav-link">Services</a>
      <a href="about.html" class="mobile-nav-link">About</a>
      <a href="index.html#contact" class="mobile-nav-link">Contact</a>
      <a href="index.html#contact" class="mobile-nav-link highlight">Book Free 30-Min Consultation →</a>
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
  }

  initScrollEffect() {
    const navbar = this.querySelector('#navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80)
    });
  }
}

customElements.define('app-header', AppHeader);
