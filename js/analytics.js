(function () {
    const ga_id = 'G-MQRVSN80YK';

    // Initialize GA commands immediately so they are queued in dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', ga_id);

    let ga_loaded = false;
    function loadGA() {
        if (ga_loaded) return;
        ga_loaded = true;

        // Create and inject the external script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${ga_id}`;
        document.head.appendChild(script);

        // Optional: Log for verification during development
        // console.log('GA Loaded');
    }

    // Defer loading until user activity to improve initial performance (FCP/LCP)
    const activityEvents = ['mouseover', 'keydown', 'touchmove', 'touchstart', 'scroll'];
    activityEvents.forEach(event => {
        window.addEventListener(event, loadGA, { passive: true, once: true });
    });

    // Fallback: Load GA after 3.5 seconds if no interaction occurs
    if (window.requestIdleCallback) {
        window.requestIdleCallback(() => setTimeout(loadGA, 3500));
    } else {
        setTimeout(loadGA, 3500);
    }
})();
