// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Form submission via mailto
const form = document.querySelector('#contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = (document.querySelector('#name') || {}).value || '';
        const phone = (document.querySelector('#phone') || {}).value || '';
        const message = (document.querySelector('#message') || {}).value || '';
        const subject = encodeURIComponent('Заявка с сайта');
        const body = encodeURIComponent(`Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`);
        const mailto = `mailto:igor.kuznetsov@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailto;
        this.reset();
        alert('Спасибо! Письмо будет отправлено через ваш почтовый клиент.');
    });
}

// Modal logic for Services
const modal = document.getElementById('service-modal');
const modalTitle = document.getElementById('service-modal-title');
const modalBody = document.getElementById('service-modal-body');

const serviceContent = {
    design: {
        title: 'Проектирование инженерных систем',
        body: '<div class="modal-media"><img src="uslugi/инж.jpg" alt="Проектирование инженерных систем" /></div>\
<p>Профессиональное проектирование систем вентиляции, кондиционирования, отопления и автоматики с учетом норм и бюджета.</p>\
<ul>\
<li>Расчет тепловых нагрузок</li>\
<li>Подбор оборудования</li>\
<li>Разработка проектной документации</li>\
<li>Согласование с надзорными органами</li>\
</ul>'
    },
    ac: {
        title: 'Системы кондиционирования',
        body: '<div class="modal-media"><img src="uslugi/конд.jpg" alt="Системы кондиционирования" /></div>\
<p>Проектирование, поставка и монтаж систем кондиционирования воздуха для квартир, домов и коммерческих объектов.</p>\
<ul>\
<li>Сплит-системы</li>\
<li>Мульти-сплит системы</li>\
<li>VRV/VRF системы</li>\
<li>Центральные системы кондиционирования</li>\
</ul>'
    },
    heating: {
        title: 'Системы отопления',
        body: '<div class="modal-media"><img src="uslugi/ото.jpg" alt="Системы отопления" /></div>\
<p>Энергоэффективные решения отопления: радиаторные и напольные системы, тепловые насосы, котельные.</p>\
<ul>\
<li>Радиаторное отопление</li>\
<li>Теплый пол</li>\
<li>Тепловые насосы</li>\
<li>Котельные установки</li>\
</ul>'
    },
    ventilation: {
        title: 'Вентиляционные системы',
        body: '<div class="modal-media"><img src="uslugi/вент.jpg" alt="Вентиляционные системы" /></div>\
<p>Проектирование и монтаж приточно-вытяжных систем с рекуперацией. Комфортный микроклимат круглый год.</p>\
<ul>\
<li>Приточно-вытяжная вентиляция</li>\
<li>Рекуперация тепла</li>\
<li>Фильтрация воздуха</li>\
<li>Увлажнение и осушение</li>\
</ul>'
    },
    vacuum: {
        title: 'Встроенные пылесосы',
        body: '<div class="modal-media"><img src="uslugi/пылесос.jpg" alt="Встроенные пылесосы" /></div>\
<p>Чистота и тишина благодаря встроенным системам пылеудаления. Удобные розетки-всасыватели и мощные агрегаты.</p>\
<ul>\
<li>Центральные пылесосы</li>\
<li>Розетки-всасыватели</li>\
<li>Пылесборные станции</li>\
<li>Аксессуары и насадки</li>\
</ul>'
    },
    automation: {
        title: 'Автоматизация и диспетчеризация',
        body: '<div class="modal-media"><img src="uslugi/диспет.jpg" alt="Автоматизация и диспетчеризация" /></div>\
<p>Интеллектуальное управление инженерией: контроллеры, датчики, удалённый доступ, сценарии.</p>\
<ul>\
<li>Контроллеры и датчики</li>\
<li>Удалённый мониторинг</li>\
<li>Сценарии управления</li>\
<li>Интеграция с умным домом</li>\
</ul>'
    },
    aereco: {
        title: 'Вентиляция Aereco',
        body: '<div class="modal-media"><img src="uslugi/aereco.jpg" alt="Вентиляция Aereco" /></div>\
<p>Энергоэффективные решения вентиляции от французского бренда Aereco. Естественная вентиляция с контролем влажности.</p>\
<ul>\
<li>Гигрорегулируемые клапаны</li>\
<li>Приточные клапаны</li>\
<li>Вытяжные решетки</li>\
<li>Системы управления</li>\
</ul>'
    }
};

function openModalByKey(key) {
    const content = serviceContent[key];
    if (!modal || !content) return;
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners for modal
document.addEventListener('click', function(e) {
    if (e.target.matches('[data-open-modal]')) {
        const service = e.target.getAttribute('data-service');
        if (service) {
            openModalByKey(service);
        }
    }
    
    if (e.target.matches('[data-close-modal]')) {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// Mobile menu functionality - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile menu...');
    
    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    
    console.log('Elements found:', { 
        burger: !!burger, 
        mobileMenu: !!mobileMenu, 
        mobileMenuClose: !!mobileMenuClose 
    });
    
    // Open mobile menu
    if (burger && mobileMenu) {
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Burger clicked, opening menu...');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    } else {
        console.error('Burger or mobile menu not found!');
    }
    
    // Close mobile menu
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked, closing menu...');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                console.log('Clicked outside, closing menu...');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking on nav links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Nav link clicked, closing menu...');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Handle mobile service buttons
    const mobileServiceBtns = document.querySelectorAll('.mobile-service-btn');
    mobileServiceBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const service = btn.getAttribute('data-service');
            console.log('Service button clicked:', service);
            if (service && typeof openModalByKey === 'function') {
                openModalByKey(service);
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            console.log('Escape pressed, closing menu...');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Auto-highlight active page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Make service cards clickable
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const serviceKey = this.getAttribute('data-service');
            if (serviceKey) {
                openModalByKey(serviceKey);
            }
        });
    });
});

//# sourceMappingURL=script.js.map
