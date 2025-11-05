document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const scrollToTopBtn = document.querySelector(".scroll-to-top");
    const robotMessage = document.querySelector(".robot-message");
    const robotButton = document.getElementById('robotButton');
    let chatContainer = null; // Will hold reference if created

    robotButton.addEventListener('click', () => {
        if (chatContainer) {
            chatContainer.classList.add('out');
            setTimeout(() => {
                chatContainer.remove();
                chatContainer = null;
                robotMessage.style.display = 'inline';
            }, 400);
        } else {
            // Create chat container
            chatContainer = document.createElement('div');
            chatContainer.id = 'chat-container';
            chatContainer.className = 'chat-container';

            chatContainer.innerHTML = `
                <div class="chat-header">
                <div style="display: flex; flex-direction: column">
                    <h3>Om's Assistant</h3>
                    <h6 style="margin: 0; font-weight: 400">Powered by <strong>OmNion</strong></h6>
                </div>            
                    <button id="close-chat" class="close-chat">X</button>
                </div>
                <div id="chat-messages" class="chat-messages">
                    <div class="message bot-message">Hello! I'm Quirky 🤖 — your personal guide to Om's resume, projects, and anything you're curious about!</div>
                </div>
                <div class="chat-input">
                    <input type="text" id="user-message" placeholder="Type your message...">
                    <button id="send-message" class="send-message" onclick="sendMessage()">Send</button>
                </div>
            `;

            document.body.appendChild(chatContainer);
            robotMessage.style.display = 'none';

            // Refill previous chat history
            const chatMessages = document.getElementById('chat-messages');
            if (messageHistory.length === 0) {
                const welcomeMsg = document.createElement('div');
                welcomeMsg.className = 'message bot-message';
                welcomeMsg.textContent = "Hello! I'm Quirky 🤖 — your personal guide to Om's resume, projects, and anything you're curious about!";
                chatMessages.appendChild(welcomeMsg);
            } else {
                messageHistory.forEach(({ sender, text }) => {
                    const msgDiv = document.createElement('div');
                    msgDiv.className = `message ${sender}-message`;
                    msgDiv.textContent = text;
                    chatMessages.appendChild(msgDiv);
                });
            }


            // Auto-focus input
            document.getElementById('user-message').focus();

            // Close button logic
            document.getElementById('close-chat').addEventListener('click', () => {
                chatContainer.remove();
                chatContainer = null;
                robotMessage.style.display = 'inline';
            });
        }
    });

    // Scroll-to-top and robot button functionality
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.add("show");
            robotButton.classList.add("scroll-active");
        } else {
            scrollToTopBtn.classList.remove("show");
            robotButton.classList.remove("scroll-active");
        }
    });

    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Robot message animation
    function toggleRobotMessage() {
        robotMessage.classList.add("show");
        setTimeout(() => {
            robotMessage.classList.remove("show");
        }, 5000); // Message visible for 3 seconds
    }

    // Show message initially and every 15 seconds
    toggleRobotMessage();
    setInterval(toggleRobotMessage, 15000);

    // Theme functionality
    if (themeToggle && themeIcon) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
            themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
        }
    }

    // Mobile menu functionality
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Set active navigation based on current path
    function updateActiveNavigation() {
        const currentPath = window.location.pathname.replace(/\/$/, '');

        navLinks.forEach(link => {
            link.classList.remove('active');

            const linkPath = link.getAttribute('href').replace(/\/$/, '');

            if (
                (currentPath === '' || currentPath === '/') && (linkPath === '/home' || linkPath === '')
                || currentPath === linkPath
            ) {
                link.classList.add('active');
            }
        });
    }

    // Update navigation on page load
    updateActiveNavigation();

    // Update navigation when using browser back/forward buttons
    window.addEventListener('popstate', updateActiveNavigation);

    // Smooth scroll for same-page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    updateActiveNavigation();
                }
            }
        });
    });

    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (header) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }

        lastScrollY = currentScrollY;
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add a subtle bounce effect for cards
                if (entry.target.classList.contains('skill-card') ||
                    entry.target.classList.contains('cta-card') ||
                    entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        entry.target.style.transform += ' scale(1.02)';
                        setTimeout(() => {
                            entry.target.style.transform = entry.target.style.transform.replace(' scale(1.02)', '');
                        }, 150);
                    }, 200);
                }
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-from-left, .animate-from-right, .section-header-animate');
    animatedElements.forEach(el => observer.observe(el));

    // Add smooth scroll behavior for better UX
    document.documentElement.style.scrollBehavior = 'smooth';

    // Enhance existing hover effects with transform origin
    const cards = document.querySelectorAll('.skill-card, .cta-card, .project-card');
    cards.forEach(card => {
        card.style.transformOrigin = 'center center';

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
});

let messageHistory = []; // Stores {sender: 'user'|'bot', text: string}


function sendMessage() {
    const userMessageInput = document.getElementById('user-message');
    const chatMessages = document.getElementById('chat-messages');

    const message = userMessageInput.value.trim();
    if (!message) return;

    // Store user message
    messageHistory.push({ sender: 'user', text: message });

    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user-message';
    userMsgDiv.textContent = message;
    chatMessages.appendChild(userMsgDiv);

    userMessageInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        fetch('/get-tag', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        })
            .then(response => response.json())
            .then(data => {
                // Store bot message
                messageHistory.push({ sender: 'bot', text: data.msg });

                const botMsgDiv = document.createElement('div');
                botMsgDiv.className = 'message bot-message';
                botMsgDiv.textContent = data.msg;
                chatMessages.appendChild(botMsgDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, 500);
}
