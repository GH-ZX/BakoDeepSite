document.addEventListener("DOMContentLoaded", () => {
  const translations = {};
  let currentLang = localStorage.getItem("lang") || "en";

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang] && translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
    });
    const langBtnSpans = document.querySelectorAll(".language-selector span");
    langBtnSpans.forEach(span => {
      if (span) span.innerText = lang.toUpperCase();
    });
  }

  function initializeApp() {
    // --- MOBILE MENU ---
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", function () {
        if (mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.remove("hidden");
          setTimeout(() => mobileMenu.classList.remove("scale-y-0"), 10);
        } else {
          mobileMenu.classList.add("scale-y-0");
          setTimeout(() => mobileMenu.classList.add("hidden"), 300);
        }
      });
    }

    // --- SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute("href"));
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // --- INTERSECTION OBSERVER FOR ANIMATIONS ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".product-card").forEach((card) => {
      observer.observe(card);
    });

    // --- MODAL LOGIC ---
    const langModal = document.getElementById("lang-modal");
    const termsModal = document.getElementById("terms-modal");
    const noticeModal = document.getElementById("notice-modal");

    function openModal(modal) {
      if (modal) modal.classList.remove("hidden");
    }
    function closeModal(modal) {
      if (modal) modal.classList.add("hidden");
    }

    // Event Listeners to OPEN modals
    document.getElementById("open-lang-modal")?.addEventListener("click", () => openModal(langModal));
    document.getElementById("open-lang-modal-mobile")?.addEventListener("click", () => openModal(langModal));
    document.getElementById("terms-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(termsModal);
    });
    document.getElementById("notice-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(noticeModal);
    });

    // Event Listeners to CLOSE modals
    document.getElementById("close-lang-modal")?.addEventListener("click", () => closeModal(langModal));
    document.getElementById("close-terms-modal")?.addEventListener("click", () => closeModal(termsModal));
    document.getElementById("close-notice-modal")?.addEventListener("click", () => closeModal(noticeModal));
    document.getElementById("close-terms-modal-button")?.addEventListener("click", () => closeModal(termsModal));
    document.getElementById("close-notice-modal-button")?.addEventListener("click", () => closeModal(noticeModal));

    window.addEventListener("click", (e) => {
      if (e.target === langModal) closeModal(langModal);
      if (e.target === termsModal) closeModal(termsModal);
      if (e.target === noticeModal) closeModal(noticeModal);
    });

    // Handle language selection from modal
    document.querySelectorAll(".lang-modal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        setLang(lang);
        closeModal(langModal);
      });
    });

    // --- CONTACT FORM LOGIC ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const message = document.getElementById('message').value;
        const toEmail = 'Abd.bako.company@gmail.com';
        const subject = 'Message from Website Contact Form';
        const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
      });
    }
  }

  // Fetch translations, then initialize the app
  fetch("translation.json")
    .then((res) => res.json())
    .then((data) => {
      Object.assign(translations, data);
      setLang(currentLang); // Translate the page first
      initializeApp(); // Then initialize all event listeners
    })
    .catch(e => console.error("Could not load translations:", e));
});
