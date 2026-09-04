const button = document.querySelector(".theme-toggle");

if (button) {
  const updateButton = () => {
    const isLight = document.documentElement.dataset.theme === "light";
    button.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} mode`);
    button.setAttribute("aria-pressed", String(isLight));
    button.firstElementChild.textContent = isLight ? "☾" : "☼";
  };

  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (_) {
      // Theme still changes when storage is unavailable.
    }
    updateButton();
  });

  updateButton();
}
