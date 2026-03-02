// ========================================
// INICIALIZACIÓN Y CONFIGURACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initProjectList();
    initScrollAnimations();
    initSmoothScroll();
});

// ========================================
// NAVBAR - CAMBIO DE COLOR EN SCROLL
// ========================================

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-links a, .btn-nav');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Aquí puedes agregar lógica para cerrar menú móvil si lo implementas
        });
    });
}

// ========================================
// LISTA DE PROYECTOS - INTERACTIVIDAD
// ========================================

function initProjectList() {
    const projectItems = document.querySelectorAll('.project-list li');
    
    projectItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Remover clase 'active' de todos los elementos
            projectItems.forEach(i => i.classList.remove('active'));
            
            // Agregar clase 'active' al elemento clickeado
            this.classList.add('active');
            
            // Log para debugging
            console.log('Proyecto seleccionado: ' + this.innerText);
            
            // Aquí puedes agregar lógica para cambiar las imágenes del proyecto
            updateProjectImages(index);
        });
    });
}

// Función para actualizar imágenes del proyecto (extensible)
function updateProjectImages(projectIndex) {
    const imgFront = document.querySelector('.img-front');
    const imgBack = document.querySelector('.img-back');
    
    // Array de proyectos con sus imágenes
    const projects = [
        {
            front: 'imagenes/pieza-metal.jpg',
            back: 'imagenes/taller-fondo.jpg'
        },
        {
            front: 'imagenes/engranaje.jpg',
            back: 'imagenes/taller-fondo.jpg'
        },
        {
            front: 'imagenes/molde.jpg',
            back: 'imagenes/taller-fondo.jpg'
        },
        {
            front: 'imagenes/medica.jpg',
            back: 'imagenes/taller-fondo.jpg'
        }
    ];
    
    if (projects[projectIndex]) {
        // Agregar efecto de fade
        imgFront.style.opacity = '0';
        imgBack.style.opacity = '0';
        
        setTimeout(() => {
            imgFront.src = projects[projectIndex].front;
            imgBack.src = projects[projectIndex].back;
            imgFront.style.opacity = '1';
            imgBack.style.opacity = '1';
        }, 300);
    }
}

// ========================================
// ANIMACIONES EN SCROLL
// ========================================

function initScrollAnimations() {
    // Observador de intersección para animaciones en scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase 'animate-on-scroll'
    const elementsToAnimate = document.querySelectorAll('.service-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    // Los enlaces ya tienen href con #, el navegador los maneja
    // Esta función es para mejorar la experiencia si es necesario
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // No prevenir comportamiento por defecto, dejar que scroll-behavior: smooth funcione
            // Excepto si es un enlace vacío
            if (href === '#') {
                e.preventDefault();
            }
        });
    });
}

// ========================================
// FUNCIONES ADICIONALES
// ========================================

// Función para enviar cotizaciones
function submitQuote(event) {
    if (event) {
        event.preventDefault();
    }
    
    // Aquí puedes agregar lógica para enviar formulario
    // Por ahora, simplemente hacemos scroll al contacto
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    console.log('Solicitud de cotización iniciada');
}

// Función para manejo de contacto (extensible)
function handleContact(email) {
    console.log('Email de contacto: ' + email);
    // Aquí puedes agregar lógica para enviar emails o conectar con servicios
}

// ========================================
// UTILIDADES GLOBALES
// ========================================

// Debounce para funciones que se disparan múltiples veces
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para detectar dispositivo móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ========================================
// LAZY LOADING DE IMÁGENES (OPCIONAL)
// ========================================

function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
}

// ========================================
// MODO OSCURO (OPCIONAL - FUTURO)
// ========================================

function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Aquí puedes agregar un botón para activar/desactivar modo oscuro
}

// ========================================
// ANALYTICS Y TRACKING
// ========================================

function trackEvent(eventName, eventData) {
    console.log(`Evento: ${eventName}`, eventData);
    
    // Aquí puedes integrar con Google Analytics o similar
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// ========================================
// PERFORMANCE MONITORING
// ========================================

window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Tiempo de carga total: ${pageLoadTime}ms`);
    }
});

// Log de errores para debugging
window.addEventListener('error', function(event) {
    console.error('Error detectado:', event.error);
    // Aquí puedes enviar errores a un servicio de logging
});
