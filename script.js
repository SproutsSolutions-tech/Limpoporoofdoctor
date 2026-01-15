const navLinks = document.querySelectorAll('.nav-links ul li');
const menuBtn = document.querySelector('.menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

// Menu button toggle
menuBtn.addEventListener('click', () => {
  navLinksContainer.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksContainer.classList.remove('active');
  });
});

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Counter animation for hero containers
const heroDisplayContainers = document.querySelector('.hero-display-containers');
const heroCounts = document.querySelectorAll('.hero-cont-count');
let hasAnimated = false;

function animateCounters() {
  heroCounts.forEach(count => {
    const finalValue = parseInt(count.textContent.replace(/\D/g, ''));
    const text = count.textContent;
    const hasPlus = text.includes('+');
    const hasIcon = count.querySelector('i');
    let currentValue = 0;
    const increment = Math.ceil(finalValue / 50);
    const speed = 30;

    const interval = setInterval(() => {
      currentValue += increment;
      if (currentValue >= finalValue) {
        currentValue = finalValue;
        clearInterval(interval);
      }
      
      if (hasIcon) {
        count.innerHTML = currentValue + (hasPlus ? ' <i class="fa-solid fa-plus"></i>' : '');
      } else {
        count.textContent = currentValue + (hasPlus ? ' +' : '');
      }
    }, speed);
  });
}

// Intersection Observer to detect when element enters viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
      hasAnimated = true;
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

if (heroDisplayContainers) {
  observer.observe(heroDisplayContainers);
}

// WhatsApp form submission
const contactForm = document.querySelector('.contact-form');
const contactBtn = document.querySelector('.contact-btn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('Message').value.trim();
    
    // Validate form fields
    if (!name || !phone || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `Hello Limpopo Roof Doctor,\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp API URL
    const whatsappURL = `https://wa.me/27608048420?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
    
    // Reset form after submission
    contactForm.reset();
  });
}
