document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Check if we're on the certifications page
    const isCertPage = window.location.pathname.includes('cert') ||
        document.title.includes('Certification') ||
        document.querySelector('.cert-provider');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const filter = tab.getAttribute('data-filter');

            if (isCertPage) {
                // Single-select behavior for certifications page
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Get the active filter
                const activeFilter = filter;

                // Show projects that match the filter
                if (activeFilter === 'all') {
                    projectCards.forEach(card => {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    });
                } else {
                    projectCards.forEach(card => {
                        const tags = card.getAttribute('data-tags').split(',');
                        if (tags.includes(activeFilter)) {
                            card.style.display = 'block';
                            card.classList.add('fade-in');
                        } else {
                            card.style.display = 'none';
                            card.classList.remove('fade-in');
                        }
                    });
                }
            } else {
                // Multi-select behavior for projects page
                if (filter === 'all') {
                    // If "All" is clicked, remove active from all tabs and activate "All"
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                } else {
                    // Toggle active class for non-"All" tabs
                    tab.classList.toggle('active');
                    // If other filters are active, ensure "All" is not active
                    const allTab = document.querySelector('.tab-btn[data-filter="all"]');
                    if (allTab.classList.contains('active')) {
                        allTab.classList.remove('active');
                    }
                }

                // Get all active filters
                const activeFilters = Array.from(tabs)
                    .filter(t => t.classList.contains('active'))
                    .map(t => t.getAttribute('data-filter'));

                // If no filters are active or "All" is active, show all projects
                if (activeFilters.length === 0 || activeFilters.includes('all')) {
                    projectCards.forEach(card => {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    });
                } else {
                    // Show projects that match any of the active filters
                    projectCards.forEach(card => {
                        const tags = card.getAttribute('data-tags').split(',');
                        const matchesFilter = activeFilters.some(filter => tags.includes(filter));
                        if (matchesFilter) {
                            card.style.display = 'block';
                            card.classList.add('fade-in');
                        } else {
                            card.style.display = 'none';
                            card.classList.remove('fade-in');
                        }
                    });
                }
            }
        });
    });

    // Carousel functionality (if carousel exists)
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const track = document.querySelector('.carousel-track');

    if (prevButton && nextButton && track) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        function updateSlides() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSlides();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
        });

        // Auto-advance carousel every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlides();
        }, 5000);

        // Ensure initial slide is displayed
        updateSlides();
    }

});