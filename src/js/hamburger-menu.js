/**
 * Hamburger Menu Toggle
 * Handles mobile navigation menu open/close functionality
 */

(function() {
  'use strict';

  // Initialize when DOM is ready
  window.addEventListener('DOMContentLoaded', initHamburgerMenu);

  function initHamburgerMenu() {
    // Wait for header to be loaded
    const checkAndInit = () => {
      const hamburgerBtn = document.querySelector('.hamburger-btn');
      const navMenu = document.querySelector('.nav-menu');
      const header = document.getElementById('header');

      // If elements are not ready yet, wait and try again
      if (!hamburgerBtn || !navMenu || !header) {
        setTimeout(checkAndInit, 50);
        return;
      }

      // Get all menu links
      const menuLinks = navMenu.querySelectorAll('a');

      // Toggle menu function
      function toggleMenu(event) {
        if (event) {event.preventDefault();}

        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }

      // Close menu function
      function closeMenu() {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }

      // Add click event to hamburger button
      hamburgerBtn.addEventListener('click', toggleMenu);

      // Close menu when clicking on a link
      menuLinks.forEach(link => {
        link.addEventListener('click', () => {
          closeMenu();
        });
      });

      // Close menu when clicking outside (on the overlay)
      navMenu.addEventListener('click', (e) => {
        // Only close if clicking on the nav overlay itself, not its children
        if (e.target === navMenu) {
          closeMenu();
        }
      });

      // Close menu on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
          closeMenu();
        }
      });

      // Close menu when window is resized to desktop view
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMenu();
          }
        }, 250);
      });

      console.log('Hamburger menu initialized');
    };

    checkAndInit();
  }
})();
