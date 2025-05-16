// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    // Ensure mobileMenu exists before adding event listeners to its children
    if (mobileMenu) {
        const navLinksMobile = mobileMenu.querySelectorAll('a'); // Select links within the mobile menu

        if (menuButton) {
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close mobile menu when a link is clicked
            navLinksMobile.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }
    }


    // --- Set Current Year in Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Active Navigation Link Highlighting ---
    const desktopNavLinks = document.querySelectorAll('header nav a.nav-link');
    const mobileNavLinksAll = document.querySelectorAll('#mobile-menu a'); // Re-selecting for clarity
    const currentPath = window.location.pathname.split('/').pop(); // Gets the current HTML file name (e.g., "about.html")
                                                                // For root (index.html), this might be "" or "index.html"

    // Function to activate links
    const activateLink = (links, activeClass, activeBgColorClass) => {
        links.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();

            // Remove existing active classes first
            link.classList.remove(activeClass); // For text color style
            if (activeBgColorClass) { // For background color style (mobile)
                link.classList.remove(activeBgColorClass, 'font-semibold');
                // Ensure default hover is reset (Tailwind classes for mobile menu hover)
                link.classList.add('hover:bg-[#333333]');
            }

            // Check for homepage (index.html or empty path)
            const isHomepageLink = (linkPath === '' || linkPath === 'index.html');
            const isCurrentPageHomepage = (currentPath === '' || currentPath === 'index.html');

            if (isCurrentPageHomepage && isHomepageLink) {
                link.classList.add(activeClass);
                if (activeBgColorClass) {
                    link.classList.add(activeBgColorClass, 'font-semibold');
                    link.classList.remove('hover:bg-[#333333]'); // Remove default hover if active
                }
            } else if (linkPath !== '' && currentPath === linkPath) { // For other pages
                link.classList.add(activeClass);
                if (activeBgColorClass) {
                    link.classList.add(activeBgColorClass, 'font-semibold');
                    link.classList.remove('hover:bg-[#333333]'); // Remove default hover if active
                }
            }
        });
    };

    // Activate desktop links (uses 'nav-link-active' for text color)
    if (desktopNavLinks.length > 0) {
        activateLink(desktopNavLinks, 'nav-link-active');
    }

    // Activate mobile links (uses 'nav-link-active' for text color and a background class)
    if (mobileNavLinksAll.length > 0) {
        activateLink(mobileNavLinksAll, 'nav-link-active', 'bg-[#1098f7]'); // Dodger Blue background for active mobile link
    }


    // --- Intersection Observer for Section Animations ---
    const sectionsToAnimate = document.querySelectorAll('.content-section'); // Target sections with this class

    if (sectionsToAnimate.length > 0) {
        const observerOptions = {
            root: null, // Observes intersections relative to the document viewport
            rootMargin: '0px', // No margin
            threshold: 0.1 // Callback triggers when 10% of the target is visible
        };

        const observerCallback = (entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('content-section-visible'); // Add class to trigger CSS animation
                    observerInstance.unobserve(entry.target); // Stop observing once animated to save resources
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

        sectionsToAnimate.forEach(section => {
            intersectionObserver.observe(section);
        });
    }

}); // End of DOMContentLoaded
