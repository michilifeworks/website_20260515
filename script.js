const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const sections = document.querySelectorAll("main > .section");
const popupLinks = document.querySelectorAll(".work-popup-link");
const popupClose = document.querySelector(".popup-close");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("is-open");
    nav.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.classList.remove("is-open");
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
    });
  });
}

if (popupClose) {
  popupClose.addEventListener("click", () => {
    window.close();
  });
}

popupLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const width = Math.min(1040, window.screen.availWidth - 40);
    const height = Math.min(820, window.screen.availHeight - 40);
    const left = Math.max(0, (window.screen.availWidth - width) / 2);
    const top = Math.max(0, (window.screen.availHeight - height) / 2);
    const popup = window.open(
      link.href,
      "michiWorksWorkDetail",
      `popup=yes,width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`,
    );

    if (popup) {
      popup.focus();
    } else {
      window.location.href = link.href;
    }
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion) {
  sections.forEach((section) => section.classList.add("is-visible"));
} else {
  sections.forEach((section) => section.classList.add("reveal-section"));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -14% 0px",
      threshold: 0.12,
    },
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
