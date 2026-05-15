const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
    rootMargin: "0px 0px -44px 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const menuButton = document.querySelector(".header__menu-button");
const headerNav = document.querySelector(".header__nav");
const headerNavLinks = document.querySelectorAll(".header__nav-text");

const closeHeaderMenu = () => {
  menuButton.classList.remove("is-open");
  headerNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
};

const toggleHeaderMenu = () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  if (isOpen) {
    closeHeaderMenu();
    return;
  }

  menuButton.classList.add("is-open");
  headerNav.classList.add("is-open");
  menuButton.setAttribute("aria-expanded", "true");
};

menuButton.addEventListener("click", toggleHeaderMenu);
headerNavLinks.forEach((link) => link.addEventListener("click", closeHeaderMenu));

document.addEventListener("click", (event) => {
  if (!headerNav.classList.contains("is-open")) {
    return;
  }

  if (!headerNav.contains(event.target) && !menuButton.contains(event.target)) {
    closeHeaderMenu();
  }
});

const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal__image");
const modalCaption = document.querySelector(".modal__caption");
const modalClose = document.querySelector(".modal__close");
const galleryItems = document.querySelectorAll(".gallery__item");

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
  modalImage.alt = "";
  document.body.style.overflow = "";
};

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const image = item.querySelector("img");

    modalImage.src = item.dataset.full;
    modalImage.alt = image.alt;
    modalCaption.textContent = item.dataset.caption;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  });
});

modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && headerNav.classList.contains("is-open")) {
    closeHeaderMenu();
  }

  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});
