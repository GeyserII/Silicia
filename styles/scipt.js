// Mobile Menu Toggle
function toggleMobileMenu() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");

  // Change icon based on menu state
  const menuToggle = document.querySelector(".menu-toggle i");
  if (navLinks.classList.contains("active")) {
    menuToggle.classList.replace("ri-menu-line", "ri-close-line");
  } else {
    menuToggle.classList.replace("ri-close-line", "ri-menu-line");
  }
}

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("active");
    document
      .querySelector(".menu-toggle i")
      .classList.replace("ri-close-line", "ri-menu-line");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-links") && !e.target.closest(".menu-toggle")) {
    document.getElementById("navLinks").classList.remove("active");
    const menuToggle = document.querySelector(".menu-toggle i");
    if (menuToggle) {
      menuToggle.classList.replace("ri-close-line", "ri-menu-line");
    }
  }
});

// Init Swiper
const swiper = new Swiper(".swiper", {
  slidesPerView: 1.2,
  spaceBetween: 18,
  centeredSlides: false,
  loop: false,
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: { 700: { slidesPerView: 2.05 }, 1100: { slidesPerView: 3.1 } },
});

// Simple on-scroll reveal for elements with .fade-up
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in-view");
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll("main section, header");
const navlinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  const fromTop = window.scrollY + 120;
  navlinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (!section) return;
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      navlinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

// Reservation form handler (front-end only)
function handleReservation(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  if (!name || !phone || !date || !time) {
    showMessage("Veuillez remplir les champs requis.", "error");
    return false;
  }
  // Create a simple payload (in real use send to API)
  const payload = {
    name,
    phone,
    email: document.getElementById("email").value,
    party: document.getElementById("party").value,
    date,
    time,
    note: document.getElementById("note").value,
  };
  console.log("Reservation payload", payload);
  showMessage(
    "Merci — votre demande a été envoyée. Nous confirmerons par téléphone.",
    "success"
  );
  e.target.reset();
  return false;
}
function showMessage(msg, type) {
  const el = document.getElementById("resMessage");
  el.textContent = msg;
  if (type === "success") {
    el.style.color = "var(--secondary)";
  } else {
    el.style.color = "crimson";
  }
  setTimeout(() => (el.textContent = ""), 6000);
}

// Lightweight performance note: images use Unsplash CDN placeholders. Replace by local optimized images in production.

const faqsData = [
  {
    question: "Quelles sont vos heures d'ouverture ?",
    answer:
      "Nous sommes ouverts du mardi au dimanche, de 11h30 à 14h30 et de 18h30 à 22h30. Fermé le lundi.",
  },
  {
    question: "Proposez-vous des options végétariennes ?",
    answer:
      "Oui, notre carte propose plusieurs options végétariennes et véganes, tant en cuisine italienne que japonaise.",
  },
  {
    question: "Comment puis-je réserver une table ?",
    answer:
      "Vous pouvez réserver via notre formulaire en ligne, par téléphone au +243859009009, ou directement sur place.",
  },
  {
    question: "Proposez-vous un service de livraison ?",
    answer:
      "Oui, nous proposons la livraison dans toute la zone de Gombe. Appelez-nous pour plus de détails.",
  },
  {
    question: "Acceptez-vous les événements privés ?",
    answer:
      "Oui, nous pouvons accueillir vos événements privés et professionnels. Contactez-nous pour un devis personnalisé.",
  },
];

const faqContainer = document.getElementById("faqContainer");

// === GENERATION DYNAMIQUE ===
faqContainer.innerHTML = faqsData
  .map(
    (faq, index) => `
            <div class="faq-item" data-index="${index}">
                <div class="faq-header">
                    <h2>${faq.question}</h2>
                    <svg class="faq-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <p class="faq-answer">${faq.answer}</p>
            </div>
        `
  )
  .join("");

// === LOGIQUE D'OUVERTURE ===
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item, index) => {
  const header = item.querySelector(".faq-header");
  const answer = item.querySelector(".faq-answer");
  const icon = item.querySelector(".faq-icon");

  header.addEventListener("click", () => {
    // Fermer les autres
    faqItems.forEach((other, i) => {
      if (i !== index) {
        other.querySelector(".faq-answer").classList.remove("open");
        other.querySelector(".faq-icon").classList.remove("rotate");
      }
    });

    // Ouvrir / Fermer celui cliqué
    answer.classList.toggle("open");
    icon.classList.toggle("rotate");
  });
});

document.querySelectorAll(".overlay a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Show more clicked !");
  });
});

// Gallery Carousel
