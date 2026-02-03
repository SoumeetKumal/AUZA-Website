class AppFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.getAttribute('variant') === 'minimal') {
      this.innerHTML = `
            <footer class="footer">
                <div class="footer-inner">
                    <div class="footer-bottom">
                        <p class="footer-copy">© 2026 AUZA. Functional Design for Growth.</p>
                        <div class="footer-legal">
                            <a href="https://www.linkedin.com/company/auza/" class="footer-legal-link" target="_blank">LinkedIn</a>
                            <a href="privacy-policy" class="footer-legal-link">Privacy Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
            `;
      return;
    }

    this.innerHTML = `
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand"><a href="./" class="logo"><img src="images/AUZA Wordmark White.png"
              alt="AUZA - Functional Design Studio" width="50"></a>
          <p class="footer-brand-desc">Functional, accessible design for ambitious businesses.</p>
        </div>
        <div>
          <h3 class="footer-heading">Navigation</h3>
          <div class="footer-links"><a href="./#work" class="footer-link">Work</a><a href="services"
              class="footer-link">Services</a><a href="./#process" class="footer-link">Process</a><a href="./#pricing"
              class="footer-link">Pricing</a><a href="./#contact" class="footer-link">Contact</a></div>
        </div>
        <div>
          <h3 class="footer-heading">Services</h3>
          <div class="footer-links"><a href="web-design" class="footer-link" target="_blank">Web Design</a><a
              href="development" class="footer-link" target="_blank">Development</a><a href="brand-strategy"
              class="footer-link" target="_blank">Brand Strategy</a><a href="accessibility-service"
              class="footer-link" target="_blank">Accessibility</a></div>
        </div>
        <div>
          <h3 class="footer-heading">Connect</h3>
          <div class="footer-links"><a href="mailto:hello@auza.mu" class="footer-link"
              target="_blank">hello@auza.mu</a><a href="https://www.linkedin.com/company/auza/" class="footer-link"
              target="_blank">LinkedIn</a></div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© 2026 AUZA. All rights reserved.</p>
        <div class="footer-legal">
          <a href="website-audit" class="footer-legal-link">Free Website Audit</a>
          <a href="privacy-policy" class="footer-legal-link" target="_blank">Privacy Policy</a>
          <a href="terms-of-service" class="footer-legal-link" target="_blank">Terms of Service</a>
          <a href="accessibility" class="footer-legal-link" target="_blank">Accessibility Statement</a>
        </div>
      </div>
    </div>
  </footer>
        `;
  }
}

customElements.define('app-footer', AppFooter);
