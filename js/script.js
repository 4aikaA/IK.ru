// Smooth scrolling for navigation links
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Form submission via mailto
const form = document.querySelector("#contact-form");
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const name = (document.querySelector("#name") || {}).value || "";
        const phone = (document.querySelector("#phone") || {}).value || "";
        const message = (document.querySelector("#message") || {}).value || "";
        const subject = encodeURIComponent("Заявка с сайта");
        const body = encodeURIComponent(`Имя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`);
        const mailto = `mailto:igor.kuznetsov@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailto;
        this.reset();
        alert("Спасибо! Письмо будет отправлено через ваш почтовый клиент.");
    });
}

// Modal logic for Services (robust)
const modal = document.getElementById("service-modal");
const modalTitle = document.getElementById("service-modal-title");
const modalBody = document.getElementById("service-modal-body");

const serviceContent = {
    design: {
        title: "Проектирование инженерных систем",
        body: "<p>Профессиональное проектирование систем вентиляции, кондиционирования, отопления и автоматики с учетом норм и бюджета.</p><ul><li>Расчет тепловых нагрузок</li><li>Подбор оборудования</li><li>Разработка проектной документации</li><li>Согласование с надзорными органами</li></ul><div class=\"modal-media\"><img src=\"uslugi/Инженер_сис.png\" alt=\"Проектирование инженерных систем\" /></div>"
    },
    ac: {
        title: "Системы кондиционирования",
        body: "<p>Проектирование, поставка и монтаж систем кондиционирования воздуха для квартир, домов и коммерческих объектов.</p><ul><li>Сплит-системы</li><li>Мульти-сплит системы</li><li>VRV/VRF системы</li><li>Центральные системы кондиционирования</li></ul><div class=\"modal-media\"><img src=\"uslugi/Конди_сис.png\" alt=\"Системы кондиционирования\" /></div>"
    },
    heating: {
        title: "Системы отопления",
        body: "<p>Энергоэффективные решения отопления: радиаторные и напольные системы, тепловые насосы, котельные.</p><ul><li>Радиаторное отопление</li><li>Теплый пол</li><li>Тепловые насосы</li><li>Котельные установки</li></ul><div class=\"modal-media\"><img src=\"uslugi/Отоплен_сис.png\" alt=\"Системы отопления\" /></div>"
    },
    ventilation: {
        title: "Вентиляционные системы",
        body: "<p>Проектирование и монтаж приточно-вытяжных систем с рекуперацией. Комфортный микроклимат круглый год.</p><ul><li>Приточно-вытяжная вентиляция</li><li>Рекуперация тепла</li><li>Фильтрация воздуха</li><li>Увлажнение и осушение</li></ul><div class=\"modal-media\"><img src=\"uslugi/Вент_сис.png\" alt=\"Вентиляционные системы\" /></div>"
    },
    vacuum: {
        title: "Встроенные пылесосы",
        body: "<p>Чистота и тишина благодаря встроенным системам пылеудаления. Удобные розетки-всасыватели и мощные агрегаты.</p><ul><li>Центральные пылесосы</li><li>Розетки-всасыватели</li><li>Пылесборные станции</li><li>Аксессуары и насадки</li></ul><div class=\"modal-media\"><img src=\"uslugi/встроен_пыл.png\" alt=\"Встроенные пылесосы\" /></div>"
    },
    automation: {
        title: "Автоматизация и диспетчеризация",
        body: "<p>Интеллектуальное управление инженерией: контроллеры, датчики, удалённый доступ, сценарии.</p><ul><li>Контроллеры и датчики</li><li>Удалённый мониторинг</li><li>Сценарии управления</li><li>Интеграция с умным домом</li></ul><div class=\"modal-media\"><img src=\"uslugi/автомат_диспет.png\" alt=\"Автоматизация и диспетчеризация\" /></div>"
    },
    aereco: {
        title: "Вентиляция Aereco",
        body: "<p>Энергоэффективные решения вентиляции от французского бренда Aereco. Естественная вентиляция с контролем влажности.</p><ul><li>Гигрорегулируемые клапаны</li><li>Приточные клапаны</li><li>Вытяжные решетки</li><li>Системы управления</li></ul><div class=\"modal-media\"><img src=\"uslugi/вент_Aereco.png\" alt=\"Вентиляция Aereco\" /></div>"
    }
};

// Open modal by key (re-query elements to avoid stale refs)
function openModalByKey(key) {
  const m = ensureServiceModal();
  const titleNode = document.getElementById("service-modal-title");
  const bodyNode = document.getElementById("service-modal-body");
    const content = serviceContent[key];
  if (!m || !content || !titleNode || !bodyNode) return;
  titleNode.textContent = content.title;
  bodyNode.innerHTML = content.body;
  m.setAttribute("aria-hidden", "false");
  m.classList.add("active");
    document.body.style.overflow = "hidden";
}

// Generic modal helpers
function closeModalEl(modalEl){
  if (!modalEl) return;
  const isContact = modalEl.id === "contact-modal";
  modalEl.setAttribute("aria-hidden","true");
  modalEl.classList.remove("active");
  // Не закрываем модалку услуги при закрытии формы связи  оставляем её на заднем плане
  // Разблокируем скролл, если больше нет открытых модалок
  const anyOpen = document.querySelector(".modal.active");
  if (!anyOpen) document.body.style.overflow = "";
}

// Delegated close handlers for ANY modal (backdrop-only, topmost on Esc)
(function(){
  document.addEventListener("click", function(e){
    // Закрываем только при клике по затемнению конкретной модалки
    const backdrop = e.target.closest(".modal-backdrop");
    if (backdrop){
      const m = backdrop.closest(".modal");
      closeModalEl(m);
      return;
    }
    // Кнопки закрытия
    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn){
      const m = closeBtn.closest(".modal");
      closeModalEl(m);
      return;
    }
  });
  // Esc: закрываем только верхнюю активную модалку
  document.addEventListener("keydown", function(e){
    if (e.key === "Escape"){
      const actives = Array.from(document.querySelectorAll(".modal.active"));
      if (actives.length){
        const top = actives[actives.length - 1];
        closeModalEl(top);
      }
    }
  });
})();

// Event delegation for modal open/close
document.addEventListener("click", function(e) {
    const openBtn = e.target.closest("[data-open-modal]");
    if (openBtn) {
        const service = openBtn.getAttribute("data-service");
        if (service) openModalByKey(service);
        return;
    }
});

// Ensure service modal exists (fallback creator)
function ensureServiceModal() {
  let m = document.getElementById("service-modal");
  if (m) {
    // Normalize existing modal to the new structure if needed
    const hasHeaderRow = !!m.querySelector(".modal-header-row");
    const titleNode = m.querySelector("#service-modal-title");
    const bodyNode = m.querySelector("#service-modal-body");
    const hasSingleDialog = m.querySelectorAll(".modal-dialog").length === 1;
    if (!hasHeaderRow || !titleNode || !bodyNode || !hasSingleDialog) {
      m.innerHTML = `
        <div class="modal-backdrop" data-close-modal></div>
        <div class="modal-dialog" role="document">
          <button class="modal-close" type="button" aria-label="Закрыть" data-close-modal>&times;</button>
          <div class="modal-content">
            <div class="modal-header-row" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
              <h2 class="modal-title" id="service-modal-title" style="margin:0; text-align:center; flex:1;">Услуга</h2>
              <button class="btn btn-primary" data-open-contact type="button">Связаться</button>
            </div>
            <div class="modal-body" id="service-modal-body"></div>
          </div>
        </div>`;
    } else {
      // Clean legacy quick form if present
      const legacyFormWrap = m.querySelector("#modal-quick-form");
      if (legacyFormWrap) legacyFormWrap.remove();
      const legacyToggle = m.querySelector("#modal-contact-toggle");
      if (legacyToggle) {
        legacyToggle.setAttribute("data-open-contact","");
        legacyToggle.className = "btn btn-primary";
        legacyToggle.removeAttribute("id");
      }
      // Ensure header row and button exist
      if (!m.querySelector("[data-open-contact]")) {
        const header = m.querySelector(".modal-header-row");
        if (header) {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "btn btn-primary";
          btn.setAttribute("data-open-contact","");
          btn.textContent = "Связаться";
          header.appendChild(btn);
        }
      }
    }
    return m;
  }
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
  <div class="modal" id="service-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
    <div class="modal-backdrop" data-close-modal></div>
    <div class="modal-dialog" role="document">
      <button class="modal-close" type="button" aria-label="Закрыть" data-close-modal>&times;</button>
      <div class="modal-content">
        <div class="modal-header-row" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
          <h2 class="modal-title" id="service-modal-title" style="margin:0; text-align:center; flex:1;">Услуга</h2>
          <button class="btn btn-primary" data-open-contact type="button">Связаться</button>
        </div>
        <div class="modal-body" id="service-modal-body"></div>
      </div>
    </div>
  </div>`;
  document.body.appendChild(wrapper.firstElementChild);
  return document.getElementById("service-modal");
}

// Floating actions: scroll to top and open quick contact in modal
(function(){
  document.addEventListener("DOMContentLoaded", function(){
    const up = document.getElementById("fab-up");
    const contact = document.getElementById("fab-contact");

    if (up) {
      up.addEventListener("click", function(){
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    if (contact) {
      contact.addEventListener("click", function(e){
        e.preventDefault();
        const m = ensureContactModal();
        const title = document.getElementById("contact-modal-title");
        if (title) title.textContent = "Быстрая заявка";
        m.setAttribute("aria-hidden", "false");
        m.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    }
  });
})();

// Delegated click handler for service cards
(function(){
  document.addEventListener("click", function(e){
    const card = e.target.closest(".service-card");
    if (card && card.getAttribute("data-service")) {
      e.preventDefault();
      const key = card.getAttribute("data-service");
      openModalByKey(key);
    }
  });
})();

// Ensure contact modal exists (create on demand)
function ensureContactModal(){
  let m = document.getElementById("contact-modal");
  if (m) return m;
  const wrapper = document.createElement("div");
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
  return document.getElementById("contact-modal");
}

// Bind all "Связаться" buttons to contact modal (ensure it exists)
(function(){
  document.addEventListener("DOMContentLoaded", function(){
    const openContactModal = (prefill)=>{
      // Оставляем модалку услуги открытой на заднем плане
      const service = document.getElementById("service-modal");
      const currentServiceTitle = document.getElementById("service-modal-title")?.textContent?.trim();
      const m = ensureContactModal();
      const title = document.getElementById("contact-modal-title");
      const finalTitle = (prefill && prefill.title) || currentServiceTitle;
      if (title && finalTitle) title.textContent = `Быстрая заявка  ${finalTitle}`; else if (title) title.textContent = "Быстрая заявка";
      m.setAttribute("aria-hidden","false");
      m.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    // Open only for explicit triggers
    document.body.addEventListener("click", function(e){
      const trigger = e.target.closest("[data-open-contact]");
      if (!trigger) return;
      e.preventDefault();
      const hostCard = trigger.closest(".service-card");
      const prefill = hostCard ? { title: hostCard.querySelector(".service-title")?.textContent?.trim() } : null;
      openContactModal(prefill);
    });

    const fab = document.getElementById("fab-contact");
    if (fab) fab.addEventListener("click", function(e){ e.preventDefault(); openContactModal(); });
  });
})();

// Bind open contact modal by attributes and ids (robust)
(function(){
  document.addEventListener("click", function(e){
    const trigger = e.target.closest("[data-open-contact], #modal-contact-toggle, .fab-contact");
    if (!trigger) return;
    e.preventDefault();

    // Оставляем модалку услуги на заднем плане (не закрываем)
    const service = document.getElementById("service-modal");
    const currentServiceTitle = document.getElementById("service-modal-title")?.textContent?.trim();

    const hostCard = trigger.closest(".service-card");
    const prefillTitle = hostCard?.querySelector(".service-title")?.textContent?.trim() || currentServiceTitle || null;
    const m = ensureContactModal();
    const title = document.getElementById("contact-modal-title");
    if (title && prefillTitle) title.textContent = `Быстрая заявка  ${prefillTitle}`; else if (title) title.textContent = "Быстрая заявка";
    m.setAttribute("aria-hidden", "false");
    m.classList.add("active");
    document.body.style.overflow = "hidden";
  });
})();

// Delegated submit for contact-quick-form (works even if form is created later)
document.addEventListener("submit", function(e){
  const form = e.target.closest("#contact-quick-form");
  if (!form) return;
  e.preventDefault();
  const name = (document.getElementById("c-name")||{}).value || "";
  const phone = (document.getElementById("c-phone")||{}).value || "";
  const msg = (document.getElementById("c-msg")||{}).value || "";
  const title = (document.getElementById("contact-modal-title")||{}).textContent || "Быстрая заявка";
  const emailSubject = encodeURIComponent(title);
  const emailBody = encodeURIComponent(`Имя: ${name}\nТелефон: ${phone}\nСообщение: ${msg}`);
  window.location.href = `mailto:igor.kuznetsov@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  const tgTextPlain = `Заявка с сайта\n${title}\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${msg}`;
  const tgShare = `https://t.me/share/url?url=&text=${encodeURIComponent(tgTextPlain)}`;
  setTimeout(()=>{ window.open(tgShare, "_blank"); }, 200);
});

// Ensure contact modal exist on load
document.addEventListener("DOMContentLoaded", function(){ try { ensureContactModal(); } catch(_){} });

// Mobile menu functionality - FIXED VERSION
(function(){
  function getBurger(){ return document.querySelector('.burger'); }
  function getMenu(){ return document.querySelector('.mobile-menu') || document.getElementById('mobile-menu'); }
  function openMenu(){
    const menu = getMenu();
    if (!menu) return;
    menu.classList.add('active');
    document.body.style.overflow = 'hidden';
    const b = getBurger(); if (b) b.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    const menu = getMenu();
    if (!menu) return;
    menu.classList.remove('active');
    document.body.style.overflow = '';
    const b = getBurger(); if (b) b.setAttribute('aria-expanded','false');
  }
  document.addEventListener('click', function(e){
    const burger = e.target.closest('.burger');
    if (burger){ e.preventDefault(); if (!getMenu()) try{ ensureMobileMenuExistsImmediate(); }catch(_){} openMenu(); return; }
    const closeBtn = e.target.closest('.mobile-menu-close');
    if (closeBtn){ e.preventDefault(); closeMenu(); return; }
    const backdrop = e.target.closest('.mobile-menu');
    if (backdrop && !e.target.closest('.mobile-menu__panel')){ e.preventDefault(); closeMenu(); return; }
    // Закрываем меню при переходе по любому пункту мобильной навигации
    const navLink = e.target.closest('.mobile-nav-menu a');
    if (navLink){ closeMenu(); }
  });
})();

(function ensureMobileMenuExists(){
  document.addEventListener('DOMContentLoaded', function(){
    if (document.querySelector('.mobile-menu')) return;
    ensureMobileMenuExistsImmediate();
  });
})();

function ensureMobileMenuExistsImmediate(){
  if (document.querySelector('.mobile-menu')) return;
  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <div class="mobile-menu__panel">
        <button class="mobile-menu-close" aria-label="Закрыть меню">✕</button>
        <nav class="mobile-nav-menu">
          <a href="about.html">О себе</a>
          <a href="index.html#services">Услуги</a>
          <a href="examples.html">Примеры работ</a>
          <a href="cooperation.html">Сотрудничество</a>
        </nav>
      </div>
    </div>`;
  document.body.appendChild(wrap.firstElementChild);
}

// Auto-highlight active page in navigation
document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-menu a, .mobile-nav-menu a");
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage || (currentPage === "" && linkPage === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});

// Make service cards clickable
document.addEventListener("DOMContentLoaded", function() {
    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", function() {
            const serviceKey = this.getAttribute("data-service");
            if (serviceKey) {
                openModalByKey(serviceKey);
            }
        });
    });
});

// Анимация статистики в блоке О себе (появление + подсчёт чисел)
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const stats = document.querySelectorAll('.about-stats .stat-number');
    if (!stats.length) return;

    const parseTarget = (el)=>{
      const t = (el.textContent||'').trim();
      const hasDigits = /\d/.test(t);
      const num = hasDigits ? (parseInt(t.replace(/\D/g,''),10) || 0) : 0;
      const hasPlus = /\+$/.test(t) || t.includes('+');
      const suffix = hasPlus && hasDigits ? '+' : (hasPlus ? '+' : '');
      return { target:num, suffix, hasDigits, raw:t };
    };

    const animateCount = (el, target, suffix)=>{
      let start = 0; const dur = 1200; const startTime = performance.now();
      function tick(now){
        const p = Math.min(1, (now - startTime) / dur);
        const val = Math.floor(start + (target - start) * p);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(tick); else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (!entry.isIntersecting) return;
        const el = entry.target; const {target, suffix, hasDigits, raw} = parseTarget(el);
        if (!hasDigits) { // оставляем строковые значения как есть (например, "РФ+ЕС")
          el.textContent = raw;
          observer.unobserve(el);
          return;
        }
        animateCount(el, target, suffix);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });

    stats.forEach(s=>observer.observe(s));
  });
})();

// Автоподмена изображений «Примеры» на WebP при поддержке браузером
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    try{
      var can = document.createElement('canvas');
      var supportsWebP = false;
      try { supportsWebP = can.toDataURL('image/webp').indexOf('data:image/webp') === 0; } catch(_) {}
      if (!supportsWebP) return;
      var imgs = document.querySelectorAll('.examples img.example-image, .examples-grid img');
      imgs.forEach(function(img){
        var src = img.getAttribute('src') || '';
        if (!/\.(png|jpe?g)$/i.test(src)) return;
        var webp = src.replace(/\.(png|jpe?g)$/i, '.webp');
        var test = new Image();
        test.onload = function(){ if (test.width>0) { img.src = webp; } };
        test.onerror = function(){};
        test.decoding = 'async';
        test.loading = 'lazy';
        test.src = webp;
      });
    }catch(e){}
  });
})();

//# sourceMappingURL=script.js.map
