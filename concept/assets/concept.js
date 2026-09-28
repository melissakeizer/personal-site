(function () {
  if (!document.querySelector(".photo-footer")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      '<footer class="photo-footer">' +
        '<div class="footer-panel">' +
          '<div class="footer-portrait"><img src="assets/melissa-avatar.jpeg" alt="Melissa Keizer"></div>' +
          '<section class="footer-about"><h2>About me</h2><p>I’m a product designer in Bangor, turning emerging technology into useful, human products.</p></section>' +
          '<section class="footer-off-duty"><h2>Outside product work</h2><p>I’m a photographer, collector of small details and the person who interrupts a walk to identify a bird—or somebody else’s dog.</p><a class="footer-about-link" href="about.html">Meet off-duty Melissa →</a></section>' +
          '<nav class="footer-explore" aria-label="Explore"><h2>Explore</h2><a href="about.html">About</a><a href="now.html">Now</a><a href="side-quests.html">Side quests</a></nav>' +
          '<nav class="footer-elsewhere" aria-label="Elsewhere"><h2>Elsewhere</h2><a href="mailto:hi@melissakeizer.com">Email</a><a href="https://uk.linkedin.com/in/melissakeizer">LinkedIn</a><a href="https://www.melissakeizerphotography.com">Photography</a></nav>' +
        '</div>' +
      '</footer>'
    );
  }

  const button = document.querySelector("[data-theme-toggle]");
  const savedTheme = localStorage.getItem("melissa-concept-theme");

  if (savedTheme === "darkroom") {
    document.body.classList.add("darkroom");
  }

  function updateLabel() {
    if (!button) return;
    const isDark = document.body.classList.contains("darkroom");
    button.textContent = isDark ? "Turn the lights on" : "Enter darkroom";
    button.setAttribute("aria-pressed", String(isDark));
  }

  if (button) {
    button.addEventListener("click", function () {
      document.body.classList.toggle("darkroom");
      localStorage.setItem(
        "melissa-concept-theme",
        document.body.classList.contains("darkroom") ? "darkroom" : "studio"
      );
      updateLabel();
    });
  }

  document.querySelectorAll("[data-card-reveal]").forEach(function (card) {
    card.addEventListener("click", function () {
      const revealed = card.getAttribute("aria-pressed") === "true";
      card.setAttribute("aria-pressed", String(!revealed));
      card.querySelector("[data-card-copy]").textContent = revealed
        ? "Add your latest pull"
        : "A tiny celebratory card reveal";
    });
  });

  document.querySelectorAll("[data-book-stack]").forEach(function (stack) {
    stack.querySelectorAll("[data-book]").forEach(function (book) {
      book.addEventListener("click", function () {
        stack.querySelectorAll("[data-book]").forEach(function (otherBook) {
          const isSelected = otherBook === book;
          otherBook.classList.toggle("is-front", isSelected);
          otherBook.setAttribute("aria-pressed", String(isSelected));
        });
      });
    });
  });

  document.querySelectorAll("[data-career-accordion]").forEach(function (accordion) {
    accordion.querySelectorAll("details").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        accordion.querySelectorAll("details").forEach(function (otherItem) {
          if (otherItem !== item) otherItem.removeAttribute("open");
        });
      });
    });
  });

  updateLabel();
})();
