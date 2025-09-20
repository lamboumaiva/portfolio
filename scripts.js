 
        // Theme Toggle
        function toggleTheme() {
            const body = document.body;
            const themeIcon = document.getElementById('theme-icon');
            if (body.getAttribute('data-theme') === 'light') {
                body.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                themeIcon.title = 'Mode clair';
            } else {
                body.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-moon';
                themeIcon.title = 'Mode sombre';
            }
            // Forcer le header à se recolorer immédiatement
            const header = document.querySelector('header');
            if (body.getAttribute('data-theme') === 'dark') {
                header.style.background = 'rgba(17, 24, 39, 0.98)';
                header.style.boxShadow = '0 2px 16px 0 rgba(0,0,0,0.4)';
                header.style.borderBottom = '1px solid #10b981';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '';
                header.style.borderBottom = '';
            }
        }

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
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

        // Animate on Scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Header Background on Scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const body = document.body;
            if (body.getAttribute('data-theme') === 'dark') {
                header.style.background = 'rgba(17, 24, 39, 0.98)';
                header.style.boxShadow = '0 2px 16px 0 rgba(0,0,0,0.4)';
                header.style.borderBottom = '1px solid #10b981';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '';
                header.style.borderBottom = '';
            }
        });

        // Add floating animation to project cards
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.animation = `pulse 1s ease-in-out`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.animation = '';
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const hero = document.querySelector('.hero');
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Add typing effect to hero title
        function typeWriter(text, element, delay = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, delay);
                }
            }
            
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero-text h1');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                setTimeout(() => {
                    typeWriter(originalText, heroTitle, 150);
                }, 1000);
            }
        });

        // Add hover effect to skill cards
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) rotateX(5deg)';
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
            });
        });

        // Add click effect to contact cards
        document.querySelectorAll('.contact-card').forEach(card => {
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = 'translateY(-5px)';
                }, 150);
            });
        });

        // Progressive loading animation for cards
        function animateCardsSequentially(selector, delay = 200) {
            const cards = document.querySelectorAll(selector);
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * delay);
            });
        }

        // Initialize sequential animations when sections come into view
        const sectionsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    switch(sectionId) {
                        case 'skills':
                            animateCardsSequentially('.skill-card', 300);
                            break;
                        case 'projects':
                            animateCardsSequentially('.project-card', 250);
                            break;
                        case 'design':
                            animateCardsSequentially('.design-card', 200);
                            break;
                        case 'contact':
                            animateCardsSequentially('.contact-card', 150);
                            break;
                    }
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.section').forEach(section => {
            sectionsObserver.observe(section);
        });

        // Add particle effect on mouse move
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.95) {
                createParticle(e.clientX, e.clientY);
            }
        });

        function createParticle(x, y) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: 0.7;
                animation: particleFloat 2s ease-out forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }

        // Add CSS for particle animation
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes particleFloat {
                0% {
                    opacity: 0.7;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100px) scale(0);
                }
            }
        `;
        document.head.appendChild(particleStyle);

        // Mobile menu functionality
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        let menuOpen = false;
        mobileMenu.addEventListener('click', () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
            } else {
                navLinks.style.display = '';
            }
        });

        // Fermer le menu mobile quand on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = '';
                    menuOpen = false;
                }
            });
        });
   