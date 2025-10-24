// ===================================
// Navigation Toggle for Mobile
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // ===================================
    // Scroll Animation Observer
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });

    // ===================================
    // Appointment Form Validation
    // ===================================
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            let isValid = true;

            // Validate name
            if (name === '' || name.length < 2) {
                showError('nameError', 'Please enter a valid name (at least 2 characters)');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate phone
            const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
            if (!phoneRegex.test(phone)) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }

            // Validate date
            if (date === '') {
                showError('dateError', 'Please select a preferred date');
                isValid = false;
            } else {
                const selectedDate = new Date(date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    showError('dateError', 'Please select a future date');
                    isValid = false;
                }
            }

            // Validate time
            if (time === '') {
                showError('timeError', 'Please select a preferred time');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                appointmentForm.style.display = 'none';
                document.getElementById('appointmentSuccess').style.display = 'block';
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    appointmentForm.reset();
                    appointmentForm.style.display = 'block';
                    document.getElementById('appointmentSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }

    // ===================================
    // Contact Form Validation
    // ===================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();

            // Get form values
            const name = document.getElementById('contactName').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('contactMessage').value.trim();

            let isValid = true;

            // Validate name
            if (name === '' || name.length < 2) {
                showError('contactNameError', 'Please enter a valid name');
                isValid = false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('contactEmailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate subject
            if (subject === '' || subject.length < 3) {
                showError('subjectError', 'Please enter a subject (at least 3 characters)');
                isValid = false;
            }

            // Validate message
            if (message === '' || message.length < 10) {
                showError('contactMessageError', 'Please enter a message (at least 10 characters)');
                isValid = false;
            }

            if (isValid) {
                // In a real scenario, this would submit to the PHP file
                // For demonstration, we'll show success message
                contactForm.style.display = 'none';
                document.getElementById('contactSuccess').style.display = 'block';
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    document.getElementById('contactSuccess').style.display = 'none';
                }, 5000);
            }
        });
    }

    // ===================================
    // Helper Functions
    // ===================================
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
    }

    // ===================================
    // Set minimum date for appointment
    // ===================================
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }

    // ===================================
    // Smooth Scrolling for Internal Links
    // ===================================
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
