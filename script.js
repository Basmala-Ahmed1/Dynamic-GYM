/**
 * Dynamic Gym Hurghada - Vanilla JS Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Dynamic Gym Engine: Initiated");
    
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // --- Mobile Menu ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeBtn && mobileMenu) {
        closeBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // --- Testimonials Carousel ---
    const testimonials = [
        {
            text: "The best equipment in the Red Sea. Dynamic Gym isn't just a place to workout; it's where I found my true potential. The atmosphere is unmatched.",
            author: "Omar Khaled",
            role: "Athlete"
        },
        {
            text: "Coaches who actually care about your form and progress. I've been to many gyms in Hurghada, but this is the only one that feels elite.",
            author: "Elena Petrova",
            role: "Fitness Enthusiast"
        },
        {
            text: "The community here is driven. Seeing everyone focus on their results pushes me to go harder every single session. Truly premium.",
            author: "Karim Samy",
            role: "Member since 2024"
        }
    ];

    let currentTestimonial = 0;
    const testText = document.getElementById('test-text');
    const testAuthor = document.getElementById('test-author');
    const testRole = document.getElementById('test-role');
    const prevBtn = document.getElementById('test-prev');
    const nextBtn = document.getElementById('test-next');

    function updateTestimonial(index) {
        if (!testText) return;
        
        // Fade out
        testText.style.opacity = 0;
        testAuthor.style.opacity = 0;
        testRole.style.opacity = 0;

        setTimeout(() => {
            testText.textContent = `"${testimonials[index].text}"`;
            testAuthor.textContent = testimonials[index].author;
            testRole.textContent = testimonials[index].role;

            // Fade in
            testText.style.opacity = 1;
            testAuthor.style.opacity = 1;
            testRole.style.opacity = 1;
        }, 300);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial(currentTestimonial);
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
            resetAutoPlay();
        });
    }

    // Auto Play
    let autoPlayInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial(currentTestimonial);
    }, 6000);

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        }, 6000);
    }

    // Initialize Transitions
    if (testText) {
        testText.style.transition = 'opacity 0.4s ease';
        testAuthor.style.transition = 'opacity 0.4s ease';
        testRole.style.transition = 'opacity 0.4s ease';
        
        // Ensure starting opacity is visible
        testText.style.opacity = 1;
        testAuthor.style.opacity = 1;
        testRole.style.opacity = 1;
    }

    // --- Membership Glow Track ---
    const cards = document.querySelectorAll('.plan-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Reveal on Scroll ---
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load

    // --- Sticky Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(3, 3, 3, 0.95)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.backgroundColor = 'rgba(3, 3, 3, 0.8)';
            navbar.style.padding = '1rem 0';
        }
    });

    // --- Booking Form (Simple Feedback) ---
    const bookingForm = document.querySelector('form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            // We let it submit to Formspree naturally
            // But we can add a loading state if we want
            const btn = bookingForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'TRANSMITTING...';
            btn.disabled = true;
            
            // Note: Formspree will redirect usually. 
            // If we used AJAX we could handle it better here.
        });
    }
});
