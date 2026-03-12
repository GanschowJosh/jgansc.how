/**
 * Apply dark mode immediately to prevent FOUC
 */
(function() {
  document.documentElement.classList.add('dark-mode');
  if (document.body) {
    document.body.classList.add('dark-mode');
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('dark-mode');
  localStorage.setItem('theme', 'dark-mode');
});
