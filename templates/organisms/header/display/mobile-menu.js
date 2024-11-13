export default () => {
  // Selecting elements for mobile menu functionality
  const mobileMenu = document.getElementById('nav-main--mobile--wrapper');
  const btnCloseMenu = document.getElementById('btn-menu-mobile--close');
  const btnOpenMenu = document.getElementById('btn-menu-mobile--open');

  // Function to toggle the mobile navigation menu
  const toggleMobileMenu = (isOpen) => {
      // Toggle the open class and set focus to the appropriate button
      mobileMenu.classList.toggle('open', isOpen);
      (isOpen ? mobileMenu : btnOpenMenu).focus();
  };

  // Event listeners for opening and closing the mobile menu
  btnOpenMenu.addEventListener('click', () => toggleMobileMenu(true));
  btnCloseMenu.addEventListener('click', () => toggleMobileMenu(false));

  // Close mobile menu with Escape key
  document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
          toggleMobileMenu(false);
      }
  });
}