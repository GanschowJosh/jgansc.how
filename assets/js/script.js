/**
 * Toggle Dark Mode
 */
document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('darkModeToggle');
  if (!toggleSwitch) return; // Exit if no toggle exists (for pages without dark mode)

  const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light-mode';

  document.body.classList.add(currentTheme);
  if (currentTheme === 'dark-mode') {
      toggleSwitch.checked = true;
  } else {
      toggleSwitch.checked = false;
  }

  toggleSwitch.addEventListener('change', function() {
      if (this.checked) {
          document.body.classList.remove('light-mode');
          document.body.classList.add('dark-mode');
          localStorage.setItem('theme', 'dark-mode');
      } else {
          document.body.classList.remove('dark-mode');
          document.body.classList.add('light-mode');
          localStorage.setItem('theme', 'light-mode');
      }
  }, false);
});