/**
 * Toggle Dark Mode
 */
export function initializeThemeToggle() {
    const toggleSwitch = document.getElementById('darkModeToggle');
    if (!toggleSwitch) return; // Exit if no toggle exists

    // Retrieve the user's theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');

    // Detect system theme preference if no saved theme
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme ? savedTheme : (prefersDarkScheme ? 'dark-mode' : 'light-mode');

    // Apply the retrieved or default theme
    document.body.classList.add(currentTheme);
    toggleSwitch.checked = currentTheme === 'dark-mode';

    // Listen for toggle switch changes
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

        // Refresh AOS to adjust animations based on theme
        AOS.refresh();
    }, false);
}

/**
 * Set Active Navigation Link Based on Current Page
 */
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Back-to-Top Button Functionality
 */
function initializeBackToTopButton() {
    const backToTopButton = document.getElementById('btn-back-to-top');

    // Show or hide the button based on scroll position
    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    // Scroll to top when the button is clicked
    function backToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Attach event listeners
    backToTopButton.addEventListener('click', backToTop);
    window.addEventListener('scroll', scrollFunction);
}

/**
 * Initialize All Features
 */
function initializeFeatures() {
    setActiveNavLink();
    initializeBackToTopButton();
}
/**
 * Toggle Dark Mode
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeThemeToggle();
  initializeFeatures();
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