/**
 * AB OVO - JavaScript Personalizado
 * Interactividad y efectos especiales para el sitio
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // =====================================================
  // 1. Smooth Scroll Navigation
  // =====================================================
  const navLinks = document.querySelectorAll('.navmenu a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // =====================================================
  // 2. Active Navigation Link on Scroll
  // =====================================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.navmenu a');

  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').slice(1) === current) {
        item.classList.add('active');
      }
    });
  });

  // =====================================================
  // 3. Header Background on Scroll
  // =====================================================
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // =====================================================
  // 4. Scroll Top Button
  // =====================================================
  const scrollTopBtn = document.getElementById('scroll-top');
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 100) {
        scrollTopBtn.style.display = 'flex';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    scrollTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =====================================================
  // 5. Trivia Cards Interactivity
  // =====================================================
  const triviaButtons = document.querySelectorAll('.trivia-card .btn');
  
  triviaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const card = this.closest('.trivia-card');
      
      // Simular que se muestra la respuesta
      const originalText = this.textContent;
      this.textContent = 'Respuesta correcta! 🎉';
      this.style.background = 'linear-gradient(135deg, #4caf50, #45a049)';
      
      setTimeout(() => {
        this.textContent = originalText;
        this.style.background = '';
      }, 2000);
    });
  });

  // =====================================================
  // 6. Hover Effects para Cards
  // =====================================================
  const cards = document.querySelectorAll('.tour-card, .feature-card, .social-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
  });

  // =====================================================
  // 7. Form Validation
  // =====================================================
  const forms = document.querySelectorAll('.php-email-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const loadingElement = this.querySelector('.loading');
      const errorElement = this.querySelector('.error-message');
      const successElement = this.querySelector('.sent-message');
      
      if (loadingElement) loadingElement.style.display = 'block';
      if (errorElement) errorElement.style.display = 'none';
      if (successElement) successElement.style.display = 'none';

      // Simular envío del formulario
      setTimeout(() => {
        if (loadingElement) loadingElement.style.display = 'none';
        if (successElement) successElement.style.display = 'block';
        
        // Limpiar formulario
        this.reset();
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          if (successElement) successElement.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  });

  // =====================================================
  // 8. Animación de Números (Counter)
  // =====================================================
  const counters = document.querySelectorAll('.purecounter');
  
  const countUp = (element) => {
    const target = +element.getAttribute('data-purecounter-end');
    const increment = target / 200;
    
    const updateCount = () => {
      const count = +element.innerText + increment;
      
      if (count < target) {
        element.innerText = Math.ceil(count);
        setTimeout(updateCount, 10);
      } else {
        element.innerText = target;
      }
    };
    
    updateCount();
  };

  // Iniciar contadores cuando estén visibles
  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.classList.contains('purecounter')) {
        if (!entry.target.classList.contains('counted')) {
          countUp(entry.target);
          entry.target.classList.add('counted');
        }
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));

  // =====================================================
  // 9. Mobile Menu Toggle
  // =====================================================
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.navmenu');

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  }

  // Cerrar menú cuando se hace clic en un enlace
  const navLinks2 = document.querySelectorAll('.navmenu a');
  navLinks2.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileNavToggle.classList.add('bi-list');
        mobileNavToggle.classList.remove('bi-x');
      }
    });
  });

  // =====================================================
  // 10. Preloader
  // =====================================================
  const preloader = document.getElementById('preloader');
  
  window.addEventListener('load', function() {
    if (preloader) {
      preloader.style.display = 'none';
    }
  });

  // =====================================================
  // 11. Animación de Entrada para elementos con AOS
  // =====================================================
  // AOS ya está incluido en la plantilla, solo asegurarse que inicia
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 120
    });
  }

  // =====================================================
  // 12. Easter Egg - Konami Code
  // =====================================================
  const konamiCode = [];
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
      activateEasterEgg();
    }
  });

  function activateEasterEgg() {
    const body = document.body;
    
    // Crear efecto especial
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes rainbow-text {
        0% { color: #ff0000; }
        20% { color: #ff7f00; }
        40% { color: #ffff00; }
        60% { color: #00ff00; }
        80% { color: #0000ff; }
        100% { color: #8b00ff; }
      }
      
      body {
        animation: none;
      }
      
      .sitename {
        animation: rainbow-text 3s infinite !important;
      }
    `;
    document.head.appendChild(style);

    // Mostrar mensajito divertido
    const easterEgg = document.createElement('div');
    easterEgg.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 30px 40px;
      border-radius: 20px;
      font-size: 24px;
      font-weight: bold;
      z-index: 9999;
      text-align: center;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      animation: slideInUp 0.5s ease;
    `;
    easterEgg.innerHTML = '¡AB OVO es Increíble! 🎭🎵';
    document.body.appendChild(easterEgg);

    setTimeout(() => {
      easterEgg.style.animation = 'slideOutDown 0.5s ease';
      setTimeout(() => easterEgg.remove(), 500);
    }, 3000);
  }

  // =====================================================
  // 13. Video Play Icons
  // =====================================================
  const playIcons = document.querySelectorAll('.tour-image a.glightbox');
  
  playIcons.forEach(icon => {
    icon.innerHTML = '<i class="bi bi-play-circle" style="font-size: 4rem; color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>';
    icon.style.position = 'absolute';
    icon.style.top = '0';
    icon.style.left = '0';
    icon.style.right = '0';
    icon.style.bottom = '0';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    icon.style.background = 'rgba(0, 0, 0, 0.3)';
    icon.style.opacity = '0';
    icon.style.transition = 'all 0.3s ease';
  });

  // Mostrar icono al hover
  const tourImages = document.querySelectorAll('.tour-image');
  tourImages.forEach(img => {
    const link = img.querySelector('a.glightbox');
    
    img.addEventListener('mouseenter', function() {
      if (link) {
        link.style.opacity = '1';
        link.style.background = 'rgba(0, 0, 0, 0.5)';
      }
    });

    img.addEventListener('mouseleave', function() {
      if (link) {
        link.style.opacity = '0';
        link.style.background = 'rgba(0, 0, 0, 0.3)';
      }
    });
  });

  console.log('%c🎭 AB OVO - Sitio Oficial 🎵', 'color: #667eea; font-size: 16px; font-weight: bold;');
  console.log('%cDesde 1989 trayendo humor y música a Paraguay', 'color: #764ba2; font-size: 14px;');
});
