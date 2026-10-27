(function () {
  "use strict";

  const forms = Array.from(document.querySelectorAll("[data-account-form]"));
  const tabs = Array.from(document.querySelectorAll("[data-account-mode]"));
  const notice = document.querySelector(".account-notice");
  if (!forms.length || !tabs.length || !notice) return;

  const setMode = mode => {
    forms.forEach(form => {
      const active = form.dataset.accountForm === mode;
      form.hidden = !active;
      form.querySelector("fieldset").disabled = !active;
    });
    tabs.forEach(tab => {
      const active = tab.dataset.accountMode === mode;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    notice.textContent =
      "Demo only: account sign-in is not connected. Do not enter a real password; login details are not sent or saved.";
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => setMode(tab.dataset.accountMode));
  });
  forms.forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      form.reset();
      notice.textContent =
        "Demo only: no account was created and no login information was sent or saved.";
    });
  });

  setMode("login");
})();
