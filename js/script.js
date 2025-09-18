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

// Modal logic for Services (robust)
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

// Open modal by key (re-query elements to avoid stale refs)
function openModalByKey(key) {
  const m = document.getElementById('service-modal') || ensureServiceModal();
  const titleNode = document.getElementById('service-modal-title');
  const bodyNode = document.getElementById('service-modal-body');
    const content = serviceContent[key];
  if (!m || !content || !titleNode || !bodyNode) return;
  titleNode.textContent = content.title;
  bodyNode.innerHTML = content.body;
  m.setAttribute('aria-hidden', 'false');
  m.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Generic modal helpers
function closeModalEl(modalEl){
  if (!modalEl) return;
  const isContact = modalEl.id === 'contact-modal';
  modalEl.setAttribute('aria-hidden','true');
  modalEl.classList.remove('active');
  // Если закрыли форму быстрой заявки — закрываем и модалку услуги, если она открыта
  if (isContact) {
    const service = document.getElementById('service-modal');
    if (service && service.classList.contains('active')) {
      service.setAttribute('aria-hidden','true');
      service.classList.remove('active');
    }
  }
  // Разблокируем скролл, если больше нет открытых модалок
  const anyOpen = document.querySelector('.modal.active');
  if (!anyOpen) document.body.style.overflow = '';
}

// Delegated close handlers for ANY modal (backdrop-only, topmost on Esc)
(function(){
  document.addEventListener('click', function(e){
    // Закрываем только при клике по затемнению конкретной модалки
    const backdrop = e.target.closest('.modal-backdrop');
    if (backdrop){
      const m = backdrop.closest('.modal');
      closeModalEl(m);
      return;
    }
    // Кнопки закрытия
    const closeBtn = e.target.closest('[data-close-modal]');
    if (closeBtn){
      const m = closeBtn.closest('.modal');
      closeModalEl(m);
      return;
    }
  });
  // Esc: закрываем только верхнюю активную модалку
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape'){
      const actives = Array.from(document.querySelectorAll('.modal.active'));
      if (actives.length){
        const top = actives[actives.length - 1];
        closeModalEl(top);
      }
    }
  });
})();

// Event delegation for modal open/close
document.addEventListener('click', function(e) {
    const openBtn = e.target.closest('[data-open-modal]');
    if (openBtn) {
        const service = openBtn.getAttribute('data-service');
        if (service) openModalByKey(service);
        return;
    }

    // The following block is now handled by the new generic close handlers
    // const closeBtn = e.target.closest('[data-close-modal]');
    // if (closeBtn) {
    //     closeModal();
    //     return;
    // }

    // Click outside dialog closes
    // if (modal && modal.classList.contains('active')) {
    //     const dialog = modal.querySelector('.modal-dialog');
    //     if (dialog && !dialog.contains(e.target)) {
    //         closeModal();
    //     }
    // }
});

// Close modal on escape key
// This listener is now handled by the new generic close handlers
// document.addEventListener('keydown', function(e) {
//     if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
//         closeModal();
//     }
// });

// Quick contact form inside service modal
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const toggleBtn = document.getElementById('modal-contact-toggle');
    const formWrap = document.getElementById('modal-quick-form');
    const titleEl = document.getElementById('service-modal-title');
    const formEl = document.getElementById('quick-form');

    if (toggleBtn && formWrap) {
      toggleBtn.addEventListener('click', function(){
        const isOpen = formWrap.style.display !== 'none';
        formWrap.style.display = isOpen ? 'none' : 'block';
      });
    }

    if (formEl) {
      formEl.addEventListener('submit', function(e){
        e.preventDefault();
        const name = (document.getElementById('q-name') || {}).value || '';
        const phone = (document.getElementById('q-phone') || {}).value || '';
        const email = (document.getElementById('q-email') || {}).value || '';
        const msg = (document.getElementById('q-msg') || {}).value || '';
        const serviceTitle = (titleEl && titleEl.textContent.trim()) || 'Услуга';
        const subject = encodeURIComponent(`Заявка: ${serviceTitle}`);
        const body = encodeURIComponent(`Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nУслуга: ${serviceTitle}\nСообщение: ${msg}`);
        window.location.href = `mailto:igor.kuznetsov@gmail.com?subject=${subject}&body=${body}`;
      });
    }
  });
})();

// Ensure service modal exists (fallback creator)
function ensureServiceModal() {
  let m = document.getElementById('service-modal');
  if (m) return m;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
  <div class="modal" id="service-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal-dialog" role="document">
      <button class="modal-close" type="button" aria-label="Закрыть" data-close-modal>&times;</button>
      <div class="modal-content">
        <div class="modal-header-row" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
          <h2 class="modal-title" id="service-modal-title" style="margin:0;">Быстрая связь</h2>
          <button class="btn btn-secondary" id="modal-contact-toggle" type="button">Связаться</button>
        </div>
        <div id="modal-quick-form" style="display:block; margin:12px 0 6px;">
          <form id="quick-form">
            <div style="display:grid; gap:10px; grid-template-columns:1fr;">
              <input type="text" id="q-name" placeholder="Ваше имя" required style="padding:10px; border:1px solid #e2e8f0; border-radius:8px;">
              <input type="tel" id="q-phone" placeholder="Телефон" style="padding:10px; border:1px solid #e2e8f0; border-radius:8px;">
              <input type="email" id="q-email" placeholder="Email" required style="padding:10px; border:1px solid #e2e8f0; border-radius:8px;">
              <textarea id="q-msg" rows="3" placeholder="Коротко о задаче" style="padding:10px; border:1px solid #e2e8f0; border-radius:8px;"></textarea>
              <button class="btn btn-secondary" type="submit">Отправить</button>
            </div>
          </form>
        </div>
        <div class="modal-body" id="service-modal-body"></div>
      </div>
    </div>
  </div>`;
  document.body.appendChild(wrapper.firstElementChild);
  // rebind globals
  return document.getElementById('service-modal');
}

// Legacy fab-contact handler removed: using unified contact modal openers


// Floating actions: scroll to top and open quick contact in modal
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const up = document.getElementById('fab-up');
    const contact = document.getElementById('fab-contact');
    const modal = document.getElementById('service-modal');
    const formWrap = document.getElementById('modal-quick-form');
    const titleEl = document.getElementById('service-modal-title');

    if (up) {
      up.addEventListener('click', function(){
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    if (contact && modal) {
      contact.addEventListener('click', function(){
        // Open modal (if not active), set generic title, open quick form
        if (!modal.classList.contains('active')) {
          if (titleEl) titleEl.textContent = 'Быстрая связь';
          modal.setAttribute('aria-hidden', 'false');
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
        if (formWrap) formWrap.style.display = 'block';
      });
    }
  });
})();

// Delegated click handler for service cards
(function(){
  document.addEventListener('click', function(e){
    const card = e.target.closest('.service-card');
    if (card && card.getAttribute('data-service')) {
      e.preventDefault();
      const key = card.getAttribute('data-service');
      openModalByKey(key);
    }
  });
})();

// Ensure contact modal exists (create on demand)
function ensureContactModal(){
  let m = document.getElementById('contact-modal');
  if (m) return m;
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
  <div class="modal" id="contact-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal-dialog" role="document">
      <button class="modal-close" type="button" aria-label="Закрыть" data-close-modal>&times;</button>
      <div class="modal-content">
        <h2 class="modal-title" id="contact-modal-title">Быстрая заявка</h2>
        <div class="modal-body">
          <form id="contact-quick-form">
            <div class="form-row">
              <input type="text" id="c-name" placeholder="Имя *" required>
              <input type="tel" id="c-phone" placeholder="Телефон *" required>
              <textarea id="c-msg" rows="4" placeholder="Сообщение" required></textarea>
            </div>
            <div class="actions">
              <button class="btn btn-send" type="submit">Отправить заявку</button>
              <button class="btn btn-cancel" type="button" data-close-modal>Отмена</button>
            </div>
          </form>
          <div class="messengers">
            Или свяжитесь с нами через мессенджеры:
            <div class="messenger-buttons">
              <a class="wa" href="https://wa.me/79216433297" target="_blank" rel="noopener"><img src="vektor/whatsapp.svg" alt="WhatsApp"> WhatsApp</a>
              <a class="tg" href="https://t.me/igor_kuznetsov1" target="_blank" rel="noopener"><img src="vektor/telegram.svg" alt="Telegram"> Telegram</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  document.body.appendChild(wrapper.firstElementChild);
  return document.getElementById('contact-modal');
}

// Bind all "Связаться" buttons to contact modal (ensure it exists)
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const openContactModal = (prefill)=>{
      const m = ensureContactModal();
      const title = document.getElementById('contact-modal-title');
      if (title && prefill && prefill.title) title.textContent = `Быстрая заявка — ${prefill.title}`; else if (title) title.textContent = 'Быстрая заявка';
      m.setAttribute('aria-hidden', 'false');
      m.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    document.body.addEventListener('click', function(e){
      const link = e.target.closest('a, button');
      if (!link) return;
      const text = (link.textContent || '').trim();
      if (text === 'Связаться') {
        e.preventDefault();
        const hostCard = link.closest('.service-card');
        const prefill = hostCard ? { title: hostCard.querySelector('.service-title')?.textContent?.trim() } : null;
        openContactModal(prefill);
      }
    });

    const fab = document.getElementById('fab-contact');
    if (fab) fab.addEventListener('click', function(e){ e.preventDefault(); openContactModal(); });
  });
})();

// Bind open contact modal by attributes and ids (robust)
(function(){
  document.addEventListener('click', function(e){
    const trigger = e.target.closest('[data-open-contact], #modal-contact-toggle, .fab-contact');
    if (!trigger) return;
    e.preventDefault();

    // Закрываем модалку услуги, чтобы не оставалась «плашка» на фоне
    const service = document.getElementById('service-modal');
    if (service && service.classList.contains('active')) {
      service.setAttribute('aria-hidden','true');
      service.classList.remove('active');
    }

    const hostCard = trigger.closest('.service-card');
    const prefill = hostCard ? { title: hostCard.querySelector('.service-title')?.textContent?.trim() } : null;
    const m = ensureContactModal();
    const title = document.getElementById('contact-modal-title');
    if (title && prefill && prefill.title) title.textContent = `Быстрая заявка — ${prefill.title}`; else if (title) title.textContent = 'Быстрая заявка';
    m.setAttribute('aria-hidden', 'false');
    m.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
})();

// Delegated submit for contact-quick-form (works even if form is created later)
document.addEventListener('submit', function(e){
  const form = e.target.closest('#contact-quick-form');
  if (!form) return;
  e.preventDefault();
  const name = (document.getElementById('c-name')||{}).value || '';
  const phone = (document.getElementById('c-phone')||{}).value || '';
  const msg = (document.getElementById('c-msg')||{}).value || '';
  const title = (document.getElementById('contact-modal-title')||{}).textContent || 'Быстрая заявка';
  const emailSubject = encodeURIComponent(title);
  const emailBody = encodeURIComponent(`Имя: ${name}\nТелефон: ${phone}\nСообщение: ${msg}`);
  window.location.href = `mailto:igor.kuznetsov@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  const tgTextPlain = `Заявка с сайта\n${title}\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${msg}`;
  const tgShare = `https://t.me/share/url?url=&text=${encodeURIComponent(tgTextPlain)}`;
  setTimeout(()=>{ window.open(tgShare, '_blank'); }, 200);
});

// Ensure contact modal exist on load
document.addEventListener('DOMContentLoaded', function(){ try { ensureContactModal(); } catch(_){} });

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
