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
                            <a href="https://www.linkedin.com/company/auza" class="footer-legal-link" target="_blank">LinkedIn</a>
                            <a href="privacy-policy.html" class="footer-legal-link">Privacy Policy</a>
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
        <div><a href="index.html" class="logo"><img src="images/AUZA Wordmark White.png"
              alt="AUZA - Functional Design Studio" width="50"></a>
          <p class="footer-brand-desc">Functional, accessible design for ambitious businesses.</p>
        </div>
        <div>
          <h4 class="footer-heading">Navigation</h4>
          <div class="footer-links"><a href="index.html#work" class="footer-link">Work</a><a href="services.html"
              class="footer-link">Services</a><a href="index.html#process" class="footer-link">Process</a><a href="index.html#pricing"
              class="footer-link">Pricing</a><a href="index.html#contact" class="footer-link">Contact</a></div>
        </div>
        <div>
          <h4 class="footer-heading">Services</h4>
          <div class="footer-links"><a href="web-design.html" class="footer-link" target="_blank">Web Design</a><a
              href="development.html" class="footer-link" target="_blank">Development</a><a href="brand-strategy.html"
              class="footer-link" target="_blank">Brand Strategy</a><a href="accessibility-service.html"
              class="footer-link" target="_blank">Accessibility</a></div>
        </div>
        <div>
          <h4 class="footer-heading">Connect</h4>
          <div class="footer-links"><a href="mailto:hello@auza.mu" class="footer-link"
              target="_blank">hello@auza.mu</a><a href="https://www.linkedin.com/company/auza" class="footer-link"
              target="_blank">LinkedIn</a></div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© 2026 AUZA. All rights reserved.</p>
        <div class="footer-legal">
          <a href="website-audit.html" class="footer-legal-link">Free Website Audit</a>
          <a href="privacy-policy.html" class="footer-legal-link" target="_blank">Privacy Policy</a>
          <a href="terms-of-service.html" class="footer-legal-link" target="_blank">Terms of Service</a>
          <a href="accessibility.html" class="footer-legal-link" target="_blank">Accessibility Statement</a>
        </div>
      </div>
    </div>
  </footer>
        `;
  }
}

customElements.define('app-footer', AppFooter);
