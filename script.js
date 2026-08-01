/* Nexus Home Cleaning — interactions */

(function () {
  "use strict";

  var WHATSAPP_NUMBER = "2347064556444";

  function buildWaLink(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    primaryNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        primaryNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        primaryNav.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Quote form -> WhatsApp ---------- */
  var quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.getElementById("qName").value.trim();
      var type = document.getElementById("qType").value;
      var area = document.getElementById("qArea").value;

      if (!name || !type || !area) {
        var firstInvalid = quoteForm.querySelector("input:invalid, select:invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var message =
        "Hello Nexus Home Cleaning! I would like to request a quote.\n\n" +
        "Name: " + name + "\n" +
        "Property type: " + type + "\n" +
        "Approximate size: " + area + "\n\n" +
        "Please send me pricing and availability.";

      window.open(buildWaLink(message), "_blank", "noopener");
    });
  }
})();
