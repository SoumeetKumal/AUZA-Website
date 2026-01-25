const auditItems = [
    {
        id: 1,
        title: "Mobile Responsiveness",
        description: "Does your site work seamlessly on phones and tablets without horizontal scrolling?",
        action: "Check your site on 'Google Mobile-Friendly Test' or resize your browser to mobile width."
    },
    {
        id: 2,
        title: "Page Speed (< 3s)",
        description: "Does your homepage load in under 3 seconds? Speed is the #1 bounce factor.",
        action: "Run a test at PageSpeed Insights (Google) and check your LCP score."
    },
    {
        id: 3,
        title: "Clear Value Proposition",
        description: "Can a visitor understand what you do and who you serve within 5 seconds?",
        action: "Ensure your hero section has a clear, bold headline and a subheading."
    },
    {
        id: 4,
        title: "Primary Call to Action (CTA)",
        description: "Is there a clear next step (e.g., 'Book a Call') visible above the fold?",
        action: "Add a high-contrast button in your navigation and hero section."
    },
    {
        id: 5,
        title: "Accessibility (WCAG 2.1)",
        description: "Is your site navigable via keyboard and readable by screen readers?",
        action: "Use the 'WAVE' browser extension to find accessibility errors."
    },
    {
        id: 6,
        title: "Trust Signals",
        description: "Do you show testimonials, case studies, or client logos to build authority?",
        action: "Add at least 3 social proof elements to your homepage."
    },
    {
        id: 7,
        title: "Contact Information",
        description: "Is it easy to find your email, phone number, or contact form?",
        action: "Ensure a 'Contact' link is in the main nav and footer."
    },
    {
        id: 8,
        title: "SEO Basics (Titles & Meta)",
        description: "Do your pages have unique titles and descriptions for search results?",
        action: "Audit your H1 tags and Meta Descriptions using a tool like SEO Meta in 1-Click."
    },
    {
        id: 9,
        title: "No Broken Links or 404s",
        description: "Are all internal and external links functional?",
        action: "Run a 'Broken Link Checker' to identify any dead ends."
    },
    {
        id: 10,
        title: "Consistent Branding",
        description: "Are your layouts, fonts, and colors consistent across all pages?",
        action: "Develop a simple style guide and audit all pages against it."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const gateForm = document.getElementById('audit-gate-form');
    const emailGate = document.getElementById('email-gate');
    const auditMain = document.getElementById('audit-main');
    const itemsContainer = document.getElementById('audit-items');
    const scoreDisplay = document.getElementById('current-score');
    const progressFill = document.getElementById('progress-fill');
    const scoreLabel = document.getElementById('score-label');
    const scoreFeedback = document.getElementById('score-feedback');

    let checkedCount = 0;

    // Check if already unlocked
    if (sessionStorage.getItem('audit-unlocked') === 'true') {
        emailGate.style.display = 'none';
        auditMain.style.display = 'block';
        renderChecklist();
    }

    // Form Submission
    gateForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // In a real app, you'd send this to your backend or email service
        const formData = new FormData(gateForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Lead Captured:', data);

        // Fade out and show audit
        emailGate.style.opacity = '0';
        setTimeout(() => {
            emailGate.style.display = 'none';
            auditMain.style.display = 'block';
            auditMain.style.opacity = '0';
            sessionStorage.setItem('audit-unlocked', 'true');
            renderChecklist();

            // Minimal fade in
            setTimeout(() => {
                auditMain.style.transition = 'opacity 0.5s ease';
                auditMain.style.opacity = '1';
            }, 50);
        }, 300);
    });

    function renderChecklist() {
        itemsContainer.innerHTML = '';
        auditItems.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'audit-item';
            itemEl.innerHTML = `
        <div class="item-checkbox">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div class="item-content">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `;

            itemEl.addEventListener('click', () => toggleItem(itemEl));
            itemsContainer.appendChild(itemEl);
        });
    }

    function toggleItem(el) {
        el.classList.toggle('checked');
        updateScore();
    }

    function updateScore() {
        const checkedItems = document.querySelectorAll('.audit-item.checked');
        checkedCount = checkedItems.length;

        scoreDisplay.innerText = checkedCount;
        const progress = (checkedCount / auditItems.length) * 100;
        progressFill.style.width = `${progress}%`;

        // Update Label and Feedback
        if (checkedCount <= 3) {
            scoreLabel.innerText = "Critical Issues";
            scoreFeedback.innerText = "Your website is likely losing a significant amount of revenue.";
        } else if (checkedCount <= 6) {
            scoreLabel.innerText = "Below Average";
            scoreFeedback.innerText = "You have the basics, but poor optimization is hurting your growth.";
        } else if (checkedCount <= 8) {
            scoreLabel.innerText = "Good Foundation";
            scoreFeedback.innerText = "Solid work, but fine-tuning could boost conversions further.";
        } else {
            scoreLabel.innerText = "Market Leader";
            scoreFeedback.innerText = "Excellent! Your site is a high-performance business tool.";
        }

        // Show Results if 10/10 or just provide general advice
        if (checkedCount > 0) {
            document.getElementById('audit-results').style.display = 'block';
            updateActionPlan();
        }
    }

    function updateActionPlan() {
        const resultsContent = document.getElementById('results-content');
        const checkedItems = document.querySelectorAll('.audit-item.checked');
        const uncheckedIds = [];

        // Find IDs of unchecked items
        const items = document.querySelectorAll('.audit-item');
        items.forEach((item, index) => {
            if (!item.classList.contains('checked')) {
                uncheckedIds.push(index);
            }
        });

        if (uncheckedIds.length === 0) {
            resultsContent.innerHTML = "<p>Congratulations! Your website meets all our high-performance standards.</p>";
            return;
        }

        let html = "<p>Focus on these key areas to improve your score:</p><ul style='list-style: none; padding: 0; margin-top: 15px;'>";
        uncheckedIds.slice(0, 3).forEach(idx => {
            html += `<li style='margin-bottom: 12px; padding: 12px; background: #1a1a1a; border-radius: 8px;'>
            <strong>${auditItems[idx].title}:</strong> ${auditItems[idx].action}
        </li>`;
        });
        html += "</ul>";
        resultsContent.innerHTML = html;
    }
});
