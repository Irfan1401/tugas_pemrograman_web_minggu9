// Smooth Scrolling Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Get the target section ID from href attribute
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate offset for sticky header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                // Smooth scroll to target position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link (optional enhancement)
                updateActiveLink(targetId);
            }
        });
    });
    
    // Function to update active navigation link
    function updateActiveLink(targetId) {
        // Remove active class from all links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current link
        const activeLink = document.querySelector(`nav a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Optional: Scroll spy functionality to highlight current section
    function scrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150; // Offset for header
        
        sections.forEach(section => {
            const htmlSection = section;
            const sectionTop = htmlSection.offsetTop;
            const sectionHeight = htmlSection.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveLink(`#${sectionId}`);
            }
        });
    }
    
    // Scroll timeout variable
    let scrollTimeout;
    
    // Add scroll event listener for scroll spy
    window.addEventListener('scroll', function() {
        // Throttle scroll events for better performance
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(scrollSpy, 10);
    });
    
    // Initial call to set active link on page load
    scrollSpy();
    
    // Add loading animation for sections (optional enhancement)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Add CSS for active link styling if not already defined
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            color: #667eea !important;
            background-color: #f8f9ff !important;
            font-weight: 600 !important;
        }
        
        /* Preload sections for animation */
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section:first-of-type {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Back to top button functionality (optional enhancement)
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    // Back to top button click handler
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effects for back to top button
    backToTopButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    console.log('Smooth scrolling functionality loaded successfully!');
});