/**
 * AUZA Scroll Animations
 * Subtle, performant scroll-triggered animations using Intersection Observer
 * Respects prefers-reduced-motion for accessibility (WCAG 2.1 AA)
 */

(function () {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Animation configuration
    const config = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Initialize scroll animations
    function initScrollAnimations() {
        if (prefersReducedMotion) {
            // If user prefers reduced motion, make all elements visible immediately
            document.querySelectorAll('[data-scroll]').forEach(el => {
                el.classList.add('scroll-visible');
            });
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.dataset.scrollDelay || 0;

                    setTimeout(() => {
                        el.classList.add('scroll-visible');
                    }, delay);

                    // Unobserve after animation (one-time animation)
                    observer.unobserve(el);
                }
            });
        }, config);

        // Observe all elements with data-scroll attribute
        document.querySelectorAll('[data-scroll]').forEach(el => {
            observer.observe(el);
        });
    }

    // Stagger animation for groups
    function initStaggerAnimations() {
        if (prefersReducedMotion) return;

        const groups = document.querySelectorAll('[data-scroll-stagger]');

        groups.forEach(group => {
            const children = group.children;
            const staggerDelay = parseInt(group.dataset.scrollStagger) || 100;

            Array.from(children).forEach((child, index) => {
                if (!child.hasAttribute('data-scroll')) {
                    child.setAttribute('data-scroll', 'fade-up');
                }
                child.dataset.scrollDelay = index * staggerDelay;
            });
        });
    }

    // Parallax effect for hero elements
    function initParallax() {
        if (prefersReducedMotion) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (parallaxElements.length === 0) return;

        let ticking = false;

        function updateParallax() {
            const scrollY = window.scrollY;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const rect = el.getBoundingClientRect();

                // Only animate if element is in viewport
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const yPos = -(scrollY * speed);
                    el.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // Counter animation for stats
    function initCounters() {
        if (prefersReducedMotion) {
            document.querySelectorAll('[data-count]').forEach(el => {
                el.textContent = el.dataset.count;
            });
            return;
        }

        const counters = document.querySelectorAll('[data-count]');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    const duration = parseInt(el.dataset.countDuration) || 2000;
                    const suffix = el.dataset.countSuffix || '';
                    const prefix = el.dataset.countPrefix || '';

                    animateCounter(el, target, duration, prefix, suffix);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    function animateCounter(el, target, duration, prefix, suffix) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out-cubic)
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeProgress * target);

            el.textContent = prefix + current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = prefix + target.toLocaleString() + suffix;
            }
        }

        requestAnimationFrame(update);
    }

    // Progress bar animation
    function initProgressBars() {
        if (prefersReducedMotion) {
            document.querySelectorAll('[data-progress]').forEach(el => {
                el.style.width = el.dataset.progress + '%';
            });
            return;
        }

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = el.dataset.progress || 100;
                    el.style.width = target + '%';
                    progressObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-progress]').forEach(bar => {
            bar.style.width = '0%';
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            progressObserver.observe(bar);
        });
    }

    // Initialize all animations on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initStaggerAnimations();
        initScrollAnimations();
        initParallax();
        initCounters();
        initProgressBars();
    }

    // Expose to global scope for manual initialization if needed
    window.AUZAScrollAnimations = {
        init: init,
        initScrollAnimations: initScrollAnimations,
        initStaggerAnimations: initStaggerAnimations,
        initParallax: initParallax,
        initCounters: initCounters
    };

})();
