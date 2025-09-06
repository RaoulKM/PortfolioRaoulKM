        // JS pour les fonctionnalités dynamiques

        document.addEventListener('DOMContentLoaded', () => {
            const loadingScreen = document.getElementById('loading');
            loadingScreen.classList.add('hidden');
        });

        // Changement de thème
        const themeButtons = document.querySelectorAll('.theme-btn');
        const body = document.body;

        themeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const newTheme = btn.dataset.theme;
                body.dataset.theme = newTheme;

                // Mettre à jour la classe "active"
                themeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Navigation active
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.href.includes(current)) {
                    link.classList.add('active');
                }
            });
        });

        // Menu mobile
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const navMenu = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
            });
        });

        // Animation d'arrière-plan avec Canvas
        const canvas = document.getElementById('bgCanvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                    this.directionY = -this.directionY;
                }

                this.x += this.directionX;
                this.y += this.directionY;

                this.draw();
            }
        }

        function initParticles() {
            particles = [];
            const numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                const size = (Math.random() * 5) + 1;
                const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                const directionX = (Math.random() * 0.5) - 0.25;
                const directionY = (Math.random() * 0.5) - 0.25;
                const color = getComputedStyle(document.documentElement).getPropertyValue('--primary-light');
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
        }

        window.addEventListener('resize', () => {
            setCanvasSize();
            initParticles();
        });

        setCanvasSize();
        initParticles();
        animateParticles();
