document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  // Mobile nav toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

        // Close mobile nav after click
        if (mainNav && navToggle) {
          mainNav.classList.remove("open");
          navToggle.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Service tabs
  const tabs = document.querySelectorAll(".service-tab");
  const panels = document.querySelectorAll(".service-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const service = tab.dataset.service;

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      panels.forEach((panel) => {
        panel.classList.toggle(
          "active",
          panel.dataset.servicePanel === service
        );
      });
    });
  });

  // Contact form -> mailto (you can change the email address here)
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const to = "info@cdhsecurity.example"; // replace with your real address
      const subject = encodeURIComponent(
        `Security enquiry from ${name || "website visitor"}`
      );
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));

      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }

  // Year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
