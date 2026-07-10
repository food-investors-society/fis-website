document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("notify-modal");
  if (!modal) return;

  const input = modal.querySelector(".notify-modal-input");
  const form = modal.querySelector("[data-notify-modal-form]");

  const openModal = () => {
    modal.removeAttribute("hidden");
    if (input) input.focus();
  };

  const closeModal = () => {
    modal.setAttribute("hidden", "");
  };

  document.querySelectorAll("[data-open-notify-modal]").forEach((button) => {
    button.addEventListener("click", openModal);
  });

  modal.querySelectorAll("[data-close-notify-modal]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hasAttribute("hidden")) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!input || !input.value.trim()) return;

      const email = input.value.trim();
      const subject = encodeURIComponent("App notify me signup");
      const body = encodeURIComponent(
        `Please notify this email when the app is ready:\n\n${email}\n`
      );

      window.location.href = `mailto:thefoodinvestorssociety@gmail.com?subject=${subject}&body=${body}`;
      closeModal();
    });
  }
});
