// Mobile menu toggle
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    if (menu.classList.contains("hidden")) {
      menu.classList.remove("hidden");
      setTimeout(() => menu.classList.remove("scale-y-0"), 10);
    } else {
      menu.classList.add("scale-y-0");
      setTimeout(() => menu.classList.add("hidden"), 300);
    }
  });

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add animation to product cards when they come into view
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

// Language Switcher Logic
const translations = {};
fetch("translation.json")
  .then((res) => res.json())
  .then((data) => {
    Object.assign(translations, data);
  });

let currentLang = "en";

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
  // Update button text
  const langBtnSpan = document.querySelector("#open-lang-modal span");
  if (langBtnSpan) langBtnSpan.innerText = lang.toUpperCase();
  // Update mobile menu button text
  const langBtnSpanMobile = document.querySelector(
    "#open-lang-modal-mobile span"
  );
  if (langBtnSpanMobile) langBtnSpanMobile.innerText = lang.toUpperCase();
}

// Modal logic
const langModal = document.getElementById("lang-modal");
const openLangModalBtn = document.getElementById("open-lang-modal");
const openLangModalBtnMobile = document.getElementById(
  "open-lang-modal-mobile"
);
const closeLangModalBtn = document.getElementById("close-lang-modal");

if (openLangModalBtn && langModal) {
  openLangModalBtn.addEventListener("click", () => {
    langModal.classList.remove("hidden");
  });
}
if (openLangModalBtnMobile && langModal) {
  openLangModalBtnMobile.addEventListener("click", () => {
    langModal.classList.remove("hidden");
  });
}
if (closeLangModalBtn && langModal) {
  closeLangModalBtn.addEventListener("click", () => {
    langModal.classList.add("hidden");
  });
}
// Close modal on outside click
window.addEventListener("click", (e) => {
  if (
    langModal &&
    !langModal.classList.contains("hidden") &&
    e.target === langModal
  ) {
    langModal.classList.add("hidden");
  }
});
// Change language from modal
const langModalBtns = document.querySelectorAll(".lang-modal-btn");
langModalBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const lang = btn.getAttribute("data-lang");
    setLang(lang);
    langModal.classList.add("hidden");
  });
});

// On load
window.addEventListener("DOMContentLoaded", () => setLang(currentLang));
