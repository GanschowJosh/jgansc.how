/**
 * Apply theme immediately to prevent FOUC
 */
(function() {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.documentElement.classList.add(savedTheme);
    // Also set it on body for immediate effect
    if (document.body) {
      document.body.classList.add(savedTheme);
    }
  })();
  
  /**
   * Toggle Dark Mode
   */
  document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('darkModeToggle');
    if (!toggleSwitch) return;
  
    const currentTheme = localStorage.getItem('theme') || 'light-mode';
  
    // Remove any existing theme classes and add the current one
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(currentTheme);
    
    // Set toggle state
    toggleSwitch.checked = currentTheme === 'dark-mode';
  
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