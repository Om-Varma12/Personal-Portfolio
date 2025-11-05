document.addEventListener('DOMContentLoaded', () => {
    console.log('Home page loaded - starting typewriter animation');

    const changingText = document.getElementById('changingText');
    const texts = [
        'Full-Stack Developer',
        'Python Enthusiast',
        'Developer',
        'Problem Solver',
        'Tech Enthusiast',
        'Code Craftsman',
        'Python Expert',
        'Full-Stack Engineer',
        'ML Engineer',
        'Data Scientist',
        'Deep Learning Specialist'
    ];

    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let charIndex = 0;

    function typeWriter() {
        const fullText = texts[currentIndex];

        if (isDeleting) {
            // Remove characters
            currentText = fullText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add characters
            currentText = fullText.substring(0, charIndex + 1);
            charIndex++;
        }

        changingText.textContent = currentText + '|';

        // Calculate typing speed
        let typeSpeed = 100; // Default typing speed

        if (isDeleting) {
            typeSpeed = 50; // Faster when deleting
        }

        // Check if word is complete
        if (!isDeleting && charIndex === fullText.length) {
            // Pause at end of word
            typeSpeed = 2000; // Wait 2 seconds before starting to delete
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next word
            isDeleting = false;
            currentIndex = (currentIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before starting next word
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start the typewriter effect
    typeWriter();

    // Photo click handler
    const photoImg = document.querySelector('.photo-img');
    if (photoImg) {
        photoImg.addEventListener('click', function () {
            console.log('Photo clicked - add file input logic here');
            // You can add file input logic here later
        });
    }

    const thumbnails = document.querySelectorAll('.thumbnail-img');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            console.log('Thumbnail clicked:', thumbnail.alt);
            // Add logic for thumbnail click (e.g., open modal or navigate)
        });
    });

    const projectLinks = document.querySelectorAll('.link-btn');
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = link.getAttribute('href');
            if (url !== '#') {
                window.location.href = url;  // manually navigate
            }
        });
    });


    const fullscreenContainer = document.createElement('div');
    fullscreenContainer.className = 'fullscreen-image';
    fullscreenContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.9);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
    `;

    const fullscreenImg = document.createElement('img');
    fullscreenImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border-radius: 8px;
    `;
    fullscreenContainer.appendChild(fullscreenImg);
    document.body.appendChild(fullscreenContainer);

    thumbnails.forEach(thumbnail => {
        // Create overlay for fullscreen icon
        const overlay = document.createElement('div');
        overlay.className = 'thumbnail-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        const fullscreenIcon = document.createElement('span');
        fullscreenIcon.className = 'material-icons';
        fullscreenIcon.textContent = 'fullscreen';
        fullscreenIcon.style.cssText = `
            color: white;
            font-size: 48px;
            opacity: 0.9;
        `;
        overlay.appendChild(fullscreenIcon);

        thumbnail.parentElement.style.position = 'relative';
        thumbnail.parentElement.appendChild(overlay);

        // Hover effect
        thumbnail.parentElement.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });

        thumbnail.parentElement.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
        });

        // Click handler for fullscreen
        thumbnail.addEventListener('click', () => {
            fullscreenImg.src = thumbnail.src;
            fullscreenContainer.style.display = 'flex';
        });
    });

    // Close fullscreen on click
    fullscreenContainer.addEventListener('click', () => {
        fullscreenContainer.style.display = 'none';
    });

    // Scroll Animation Observer - Add this before the closing });
    
});