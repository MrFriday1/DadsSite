// ─── Current Year ───────────────────────────────────────────────────────────
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── Fade-in on scroll ───────────────────────────────────────────────────────
const sections = document.querySelectorAll('.fade-in-section');
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ─── Anti-scrape: phone & email injected by JS ───────────────────────────────
(function () {
  const phone = "+14168439071";
  const displayPhone = "(416) 843-9071";
  const user = "gerardp1";
  const domain = "live.ca";
  const email = user + "@" + domain;

  const phoneLink = document.getElementById("phone-link");
  if (phoneLink) {
    phoneLink.href = "tel:" + phone;
    phoneLink.textContent = displayPhone;
  }

  const emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.href = "mailto:" + email;
    emailLink.textContent = email;
  }
})();

// ─── Services accordion (single-open) ────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  // Accordion
  const buttons = document.querySelectorAll(".service-acc");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const panel = btn.nextElementSibling;
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      buttons.forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        const p = b.nextElementSibling;
        if (p && p.classList.contains("service-panel")) p.classList.add("hidden");
        const icon = b.querySelector(".acc-icon");
        if (icon) icon.textContent = "+";
      });

      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        if (panel && panel.classList.contains("service-panel")) panel.classList.remove("hidden");
        const icon = btn.querySelector(".acc-icon");
        if (icon) icon.textContent = "–";
      }
    });
  });

  // ─── Mobile nav toggle ──────────────────────────────────────────────────────
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close menu when a link is tapped
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── Form cooldown (index.html contact form) ────────────────────────────────
  const COOLDOWN = 60;
  const form = document.querySelector('form[action*="formspree"]');
  const btn = document.getElementById('submit-btn');
  const msg = document.getElementById('cooldown-msg');

  if (form && btn && msg) {
    const lastSent = parseInt(localStorage.getItem('formLastSent') || '0', 10);
    const elapsed = Math.floor((Date.now() - lastSent) / 1000);
    if (lastSent && elapsed < COOLDOWN) startCooldown(COOLDOWN - elapsed);

    form.addEventListener('submit', function (e) {
      if (btn.disabled) { e.preventDefault(); return; }
      localStorage.setItem('formLastSent', Date.now());
      setTimeout(function () { form.reset(); }, 100);
      startCooldown(COOLDOWN);
    });

    function startCooldown(seconds) {
      let remaining = seconds;
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.cursor = 'not-allowed';
      msg.classList.remove('hidden');
      update();
      const timer = setInterval(function () {
        remaining--;
        if (remaining <= 0) {
          clearInterval(timer);
          btn.disabled = false;
          btn.style.opacity = '';
          btn.style.cursor = '';
          msg.classList.add('hidden');
        } else {
          update();
        }
      }, 1000);
      function update() {
        msg.textContent = 'You can send another message in ' + remaining + ' second' + (remaining !== 1 ? 's' : '') + '.';
      }
    }
  }

});

// ─── Gallery: side-scroll carousel ───────────────────────────────────────────
function sideScroll(btn, direction) {
  const container = btn.closest('.relative').querySelector('.no-swipe');
  const scrollWidth = container.clientWidth;
  const maxScrollLeft = container.scrollWidth - container.clientWidth;

  if (direction === 'left') {
    if (container.scrollLeft <= 0) {
      container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: -scrollWidth, behavior: 'smooth' });
    }
  } else {
    if (container.scrollLeft >= maxScrollLeft - 1) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollWidth, behavior: 'smooth' });
    }
  }
}

// ─── Gallery: lightbox ───────────────────────────────────────────────────────
function openLightbox(element) {
  const img = element.querySelector('img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = img.src;
  lightbox.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}