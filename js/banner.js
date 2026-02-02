/**
 * Centralized Promo Banner
 * Source of truth for all pages.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Prevent duplicate banners
    if (document.querySelector('.announcement-banner')) return;

    const bannerHTML = `
    <a href="index.html#contact" class="announcement-banner">
        <span class="banner-prefix">🚀 Launch Offer: </span><span class="banner-text">First 5 Clients Save 25% <span class="banner-extra">| Limited Slots for
                Q1 2026</span></span>
        <span class="badge-dot"></span>
        <span class="banner-cta">Claim Yours →</span>
    </a>
    `;

    // Insert as the first child of body, or before the nav if appropriate
    // Ideally it's fixed, so prepending to body is fine.
    document.body.insertAdjacentHTML('afterbegin', bannerHTML);

    // Ensure the css/banner.css is loaded if not already
    // (Most pages have style.css which might import it, or we can inject the link tag too if needed)
    // Checking if banner.css is linked would be good practice, but for now assuming existing css structure handles it
    // or we can inject the styles directly here to be truly self-contained?
    // The user has a css/banner.css file. Let's make sure it's used.
    // simpler to just expect the page to have the CSS, but to be safe:

    // Inject Styles for Layout Shift
    const style = document.createElement('style');
    style.innerHTML = `
        :root {
            --banner-height: 48px; /* Fallback */
        }
        
        body {
            /* Create space for fixed banner */
            padding-top: var(--banner-height) !important; 
        }

        /* Adjust Navigation Top Position */
        .nav, .nav-app, .vanguard-nav, .strato-nav {
            top: var(--banner-height) !important;
        }

        /* Ensure banner is always on top */
        .announcement-banner {
            z-index: 9999 !important;
        }

        /* Nav needs to be just below */
        .nav, .nav-app, .vanguard-nav, .strato-nav {
            z-index: 9998 !important;
        }
        
        /* Mobile menu needs to be high but below banner if possible, or cover all */
        .mobile-menu {
             z-index: 9997 !important;
        }
    `;
    document.head.appendChild(style);

    // Initial check for CSS
    if (!document.querySelector('link[href*="banner.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/banner.css';
        document.head.appendChild(link);
    }

    // Dynamic Height Calculation
    function updateBannerHeight() {
        const banner = document.querySelector('.announcement-banner');
        if (banner) {
            const height = banner.offsetHeight;
            document.documentElement.style.setProperty('--banner-height', `${height}px`);
        }
    }

    // Run on load and resize
    window.addEventListener('load', updateBannerHeight);
    window.addEventListener('resize', updateBannerHeight);
    // Observe DOM changes just in case (e.g. font loading)
    const observer = new ResizeObserver(updateBannerHeight);
    const banner = document.querySelector('.announcement-banner');
    if (banner) observer.observe(banner);

    // Immediate run
    updateBannerHeight();
});
