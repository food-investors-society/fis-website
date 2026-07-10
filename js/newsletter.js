document.addEventListener("DOMContentLoaded", () => {
  const newsletterSections = document.querySelectorAll(".newsletter-section .container");
  const socialSections = document.querySelectorAll(".social-section");

  if (!newsletterSections.length && !socialSections.length) return;

  const links = [
    { href: "join-us.html", label: "Join the Society" },
    { href: "about-supporter.html", label: "Become a Supporter" },
    { href: "about-m3-volunteer.html", label: "Become a Volunteer" },
    { href: "donation.html", label: "Donate" }
  ];

  const linksMarkup = links
    .map((link) => `<a href="${link.href}" class="post-social-link">${link.label}</a>`)
    .join("");

  newsletterSections.forEach((container, index) => {
    container.innerHTML = `
      <div class="newsletter-shell">
        <div class="newsletter-copy" style="margin-bottom: 12px;">
          <h2>Stay in the Loop</h2>
          <p style="margin: 2px 0 4px;">Join our newsletter for launch news, early access updates, and practical ways to support a fairer food future.</p>
        </div>
        <div class="newsletter-panel">
          <form class="newsletter-form" data-newsletter-form>
            <div class="newsletter-input-row" style="display: flex; align-items: center; gap: 10px; flex-wrap: nowrap;">
              <input
                id="newsletter-email-${index}"
                class="newsletter-input"
                style="width: 540px; min-width: 540px; max-width: 540px; height: 44px; box-sizing: border-box; background: rgba(92, 138, 98, 0.42); border: 1px solid rgba(92, 138, 98, 0.62); border-radius: 999px;"
                type="email"
                name="email"
                placeholder="you@example.com"
                autocomplete="email"
                required
              >
              <button class="newsletter-submit" type="submit" style="display: inline-flex; align-items: center; justify-content: center; height: 44px; margin: 8px 0 0; padding: 0 18px; border: 1px solid #ffffff; background: #ffffff; color: #09160e; font-weight: 600; white-space: nowrap; flex: 0 0 auto;">Get updates</button>
            </div>
            <p class="newsletter-status" data-newsletter-status aria-live="polite"></p>
          </form>
        </div>
      </div>
    `;
  });

  socialSections.forEach((section) => {
    const nextElement = section.nextElementSibling;
    if (nextElement && nextElement.classList.contains("post-social-links-section")) return;

    section.insertAdjacentHTML(
      "afterend",
      `
        <div class="post-social-links-section">
          <div class="container">
            <h2 class="post-social-links-title">Support Us</h2>
            <div class="post-social-links">
              ${linksMarkup}
            </div>
          </div>
        </div>
      `
    );
  });

  document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
    const status = form.querySelector("[data-newsletter-status]");
    const input = form.querySelector(".newsletter-input");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!input || !input.value.trim()) return;

      const email = input.value.trim();
      const subject = encodeURIComponent("Newsletter signup");
      const body = encodeURIComponent(
        `Please add this email to the foodXchange newsletter list:\n\n${email}\n`
      );

      if (status) {
        status.textContent = "Opening your email app to confirm the signup.";
      }

      window.location.href = `mailto:thefoodinvestorssociety@gmail.com?subject=${subject}&body=${body}`;
    });
  });
});
