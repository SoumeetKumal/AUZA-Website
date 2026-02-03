/**
 * Centralized Promo Banner - Client Side Logic
 * This script now only handles dynamic adjustments.
 * HTML is pre-rendered for performance (Zero CLS).
 */
document.addEventListener('DOMContentLoaded', () => {
    const banner = document.querySelector('.announcement-banner');
    if (!banner) return;

    // Use a CSS variable for the header to offset
    function updateBannerHeight() {
        const height = banner.offsetHeight;
        document.documentElement.style.setProperty('--banner-height', `${height}px`);
    }

    // Use ResizeObserver for efficient main-thread management (no layout thrashing)
    const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
            const height = entry.target.offsetHeight;
            document.documentElement.style.setProperty('--banner-height', `${height}px`);
        }
    });

    observer.observe(banner);
    updateBannerHeight();
});
