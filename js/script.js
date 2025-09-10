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

// Burger menu toggle
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
if (burger && navMenu) {
    burger.addEventListener('click', () => {
        const active = navMenu.classList.toggle('active');
        burger.setAttribute('aria-expanded', String(active));
    });
}

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
<p><strong>Профессиональное проектирование</strong> систем вентиляции, кондиционирования, отопления и автоматики с учетом норм и бюджета.</p>\
<p><strong>Что мы предлагаем:</strong></p>\
<ul style="margin: 0 0 16px 18px; line-height: 1.8; color: #444;">\
  <li>Аудит объекта и ТЗ</li>\
  <li>Подбор оборудования</li>\
  <li>Планы, схемы, спецификации</li>\
  <li>Смета и сроки</li>\
  <li>Авторский надзор</li>\
  <li>Сопровождение монтажа</li>\
</ul>'
    },
    ac: {
        title: 'Системы кондиционирования',
        body: '<div class="modal-media"><img src="uslugi/кон.jpg" alt="Системы кондиционирования" /></div>\
<p><strong>Проектирование, поставка и монтаж</strong> систем кондиционирования для квартир, домов и коммерческих объектов. Индивидуальный подбор и современная автоматика.</p>\
<p><strong>Что мы предлагаем:</strong></p>\
<ul style="margin: 0 0 16px 18px; line-height: 1.8; color: #444;">\
  <li>Сплит‑системы и мульти‑сплит</li>\
  <li>Канальные и VRF</li>\
  <li>Инверторные решения</li>\
  <li>Автоматизация и управление</li>\
  <li>Монтаж и сервис</li>\
  <li>Гарантийная поддержка</li>\
</ul>'
    },
    heating: {
        title: 'Системы отопления',
        body: '<div class="modal-media"><img src="uslugi/ото.jpg" alt="Системы отопления" /></div>\
<p><strong>Энергоэффективные решения отопления:</strong> радиаторные и напольные системы, тепловые насосы, котельные.</p>\
<p><strong>Что мы предлагаем:</strong></p>\
<ul style="margin: 0 0 16px 18px; line-height: 1.8; color: #444;">\
  <li>Тепловые насосы</li>\
  <li>Тёплые полы и радиаторы</li>\
  <li>Гидравлика и обвязка</li>\
  <li>Автоматика и погодозависимое управление</li>\
  <li>Монтаж и пуско‑наладка</li>\
  <li>Сервис и гарантия</li>\
 </ul>'
    },
    ventilation: {
        title: 'Вентиляционные системы',
        body: '<div class="modal-media"><img src="uslugi/вен.jpg" alt="Вентиляционные системы" /></div>\
<p><strong>Проектирование и монтаж</strong> приточно‑вытяжных систем с рекуперацией. Комфортный микроклимат круглый год.</p>\
<p><strong>Что мы предлагаем:</strong></p>\
<ul style="margin: 0 0 16px 18px; line-height: 1.8; color: #444;">\
  <li>ПВУ с рекуперацией</li>\
  <li>Шумоглушение и воздухораспределение</li>\
  <li>Системы фильтрации</li>\
  <li>Автоматизация и диспетчеризация</li>\
  <li>Монтаж и сервис</li>\
  <li>Паспортизация</li>\
</ul>'
    },
    vacuum: {
        title: 'Встроенные пылесосы',
        body: '<div class="modal-media"><img src="uslugi/пыл.jpg" alt="Встроенные пылесосы" /></div>\
<p><strong>Чистота и тишина</strong> благодаря встроенным системам пылеудаления. Удобные розетки‑всасыватели и мощные агрегаты.</p>\
<p><strong>Что мы предлагаем:</strong></p>\
<ul style="margin: 0 0 16px 18px; line-height: 1.8; color: #444;">\
  <li>Проект и трассировка</li>\
  <li>Встройка в ремонт</li>\
  <li>Пылесборники и аксессуары</li>\
  <li>Сервисное обслуживание</li>\
  <li>Гарантия</li>\
  <li>Интеграция с умным домом</li>\
</ul>'
    },
    automation: {
        title: 'Автоматизация и диспетчеризация',
        body: '<div class="modal-media"><img src="uslugi/авто.jpg" alt="Автоматизация и диспетчеризация" /></div>\
<p><strong>Интеллектуальное управление инженерией:</strong> контроллеры, датчики, удалённый доступ, сценарии.</p>\
<p><strong>Что мы предлагаем:</strong></p>\
<ul style="margin: 0 0 16px 18px; line-height: 1.8; color: #444;">\
  <li>Пульты и контроллеры</li>\
  <li>Сбор данных и аварийные оповещения</li>\
  <li>Удалённый доступ</li>\
  <li>Интеграция с BMS и умным домом</li>\
  <li>Пуско‑наладка</li>\
  <li>Сервис</li>\
</ul>'
    },
    aereco: {
        title: 'Вентиляция Aereco',
        body: '<div class="modal-media"><img src="uslugi/эерко.jpg" alt="Вентиляция Aereco" /></div>\
<p><strong>Энергосберегающие решения естественной вентиляции.</strong> Установка и настройка систем Aereco для оптимального воздухообмена при минимальном потреблении энергии.</p>\
<p><strong>Что мы предлагаем:</strong></p>\
<ul style="margin: 0 0 16px 18px; line-height: 1.8; color: #444;">\
  <li>Системы естественной вентиляции</li>\
  <li>Гигрорегулируемые клапаны</li>\
  <li>Энергосберегающие решения</li>\
  <li>Автоматическая регулировка</li>\
  <li>Монтаж и настройка</li>\
  <li>Техническое обслуживание</li>\
</ul>'
    }
};

function openModalByKey(key) {
    const content = serviceContent[key];
    if (!modal || !content) return;
    modalTitle.textContent = content.title;
    modalBody.innerHTML = content.body;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Open by button click
document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.getAttribute('data-service');
        openModalByKey(key);
    });
});

// Make whole cards clickable as well
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Ignore clicks on inner links/buttons to avoid duplicate handling
        const target = e.target;
        if (target.closest('a, button')) return;
        const key = card.getAttribute('data-service');
        if (key) openModalByKey(key);
    });
});

// Close handlers
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target.matches('[data-close-modal]') || e.target.classList.contains('modal')) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });
}

// Handle "Заявка" button inside modal
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.matches('[data-go-contact]')) {
        e.preventDefault();
        closeModal();
        const section = document.querySelector('#contact');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            window.location.hash = '#contact';
        }
    }
});
