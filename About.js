document.addEventListener('DOMContentLoaded', function() {
    // Animate feature cards on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const teamMembers = document.querySelectorAll('.team-member');

    // Intersection Observer for feature cards
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    // Apply initial styles and observe feature cards
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        featureObserver.observe(card);
    });

    // Intersection Observer for team members
    const teamObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    // Apply initial styles and observe team members
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(20px)';
        member.style.transition = 'all 0.5s ease';
        teamObserver.observe(member);
    });

    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        link.style.transition = 'transform 0.3s ease';
    });

    // Add click animation to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
        item.style.transition = 'transform 0.2s ease';
        item.style.cursor = 'pointer';
    });

    // Copy contact information on click
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('p').textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Create and show tooltip
                const tooltip = document.createElement('div');
                tooltip.className = 'copy-tooltip';
                tooltip.textContent = 'Copied!';
                tooltip.style.position = 'absolute';
                tooltip.style.background = '#2ecc71';
                tooltip.style.color = 'white';
                tooltip.style.padding = '5px 10px';
                tooltip.style.borderRadius = '5px';
                tooltip.style.fontSize = '14px';
                tooltip.style.zIndex = '1000';

                // Position tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.top = `${rect.top - 30}px`;
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.transform = 'translateX(-50%)';

                document.body.appendChild(tooltip);

                // Remove tooltip after animation
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(tooltip);
                    }, 300);
                }, 1000);
            });
        });
    });

    // Version number animation
    const versionSpan = document.querySelector('.info-item span:last-child');
    if (versionSpan && versionSpan.textContent.includes('1.0.0')) {
        let dots = 0;
        const maxDots = 3;
        setInterval(() => {
            dots = (dots + 1) % (maxDots + 1);
            versionSpan.style.opacity = 0.5 + (dots * 0.5 / maxDots);
        }, 500);
    }

    // Add smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});