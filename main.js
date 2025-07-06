// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Fix for scroll behavior
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 100) {
    nav.classList.add('bg-white/95', 'shadow-lg');
    nav.classList.remove('bg-white/90');
  } else {
    nav.classList.remove('bg-white/95', 'shadow-lg');
    nav.classList.add('bg-white/90');
  }
});

// Contact form validation and submission
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Simple validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }
    // You can add AJAX here to send the form data
    showNotification('Thank you for reaching out, ' + name + '! I will get back to you soon.', 'success');
    form.reset();
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`;
  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} mr-2"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  // Animate out and remove
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeInUp');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.bg-white, .bg-gradient-to-br');
  animateElements.forEach(el => {
    observer.observe(el);
  });
});

// Typing effect for the main heading
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize special effects when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Add typing effect to the main name
  const mainName = document.getElementById('mainName');
  if (mainName) {
    // Start typing effect
    typeWriter(mainName, 'Aniket Arya', 150);
  }
  
  // Add particle effect to the home section
  createParticles();
});

// Create floating particles effect
function createParticles() {
  const homeSection = document.getElementById('home');
  if (!homeSection) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(99, 102, 241, 0.6);
      border-radius: 50%;
      pointer-events: none;
      animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
    `;
    homeSection.appendChild(particle);
  }
}

// Removed parallax effect to fix scrolling issues

// Skill progress bars animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll('.bg-gradient-to-r');
  progressBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

// Trigger progress bar animation when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
      skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
});

// Mobile navigation toggle
const mobileNavToggle = document.createElement('button');
mobileNavToggle.className = 'md:hidden fixed top-4 right-4 z-50 bg-indigo-600 text-white p-2 rounded-lg';
mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';

const nav = document.querySelector('nav');
if (nav) {
  nav.appendChild(mobileNavToggle);
  
  mobileNavToggle.addEventListener('click', () => {
    const navLinks = nav.querySelector('.hidden');
    navLinks.classList.toggle('hidden');
    navLinks.classList.toggle('flex');
    navLinks.classList.toggle('flex-col');
    navLinks.classList.toggle('absolute');
    navLinks.classList.toggle('top-full');
    navLinks.classList.toggle('left-0');
    navLinks.classList.toggle('w-full');
    navLinks.classList.toggle('bg-white');
    navLinks.classList.toggle('shadow-lg');
    navLinks.classList.toggle('p-4');
  });
}

// Add loading animation to project cards
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.bg-white.rounded-2xl');
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 200);
  });
}); 