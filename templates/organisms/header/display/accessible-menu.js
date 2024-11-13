/* Accessible menu functions for Desktop */

export default () => {
    // Selecting the main wrapper of the accessible menus
    const menuWrappers = document.querySelectorAll('.accessible-menu');

    // Function to toggle the visibility of a submenu
    function toggleSubnav(li, isOpen = null) {
        // Determine whether to open or close the submenu
        const shouldBeOpen = isOpen !== null ? isOpen : !li.classList.contains('open');
        // Toggle the open class and aria-expanded attribute
        li.classList.toggle('open', shouldBeOpen);
        const btn = li.querySelector('button');
        btn.classList.toggle("open");
        // Add context to screen reader text label.
        const activatingA = li.querySelector("a");
        btn.setAttribute('aria-expanded', shouldBeOpen);
        // Update the screen reader text based on submenu state
        const screenReaderText = btn.querySelector('.screen-reader-text');
        if (!screenReaderText) return;
        screenReaderText.textContent = `${shouldBeOpen ? 'Close' : 'Open'} submenu for “${activatingA.textContent}`;
    }

    // Function to close all open submenus
    function closeAllSubmenus() {
        document.querySelectorAll('.menu-item-has-children.open').forEach(li => toggleSubnav(li, false));
    }

    // Function to set the label on submenus with children
    function setSubmenuLabel(submenu) {
        const activatingA = submenu.querySelector("a");
        /* Sets submenu button label, inserts it into a sr-only span in the btn. */
        const buttonLabel = `Open submenu for “${activatingA.textContent}”`;
        const btn = submenu.getElementsByTagName('button');
        // Create span element
        const span = document.createElement('span');
        span.classList.add('sr-only', 'screen-reader-text');
        span.textContent = buttonLabel;
        // Insert span into button
        if (btn[0]) {
            btn[0].appendChild(span);
        }
    }

    // Loop through each menu wrapper to add event listeners and submenu labels
    for (const menuWrapper of menuWrappers) {
        // Event for handling clicks on submenu buttons
        menuWrapper.addEventListener('click', event => {
            const button = event.target.closest('.menu-item-has-children > button');
            if (button) {
                event.stopPropagation();
                const li = button.closest('.menu-item-has-children');
                toggleSubnav(li);
            }
        });

        // Handling focus change to close submenus when focus moves out of them
        menuWrapper.addEventListener('focusin', event => {
            if (!event.target.closest('.menu-item-has-children.open')) {
                closeAllSubmenus();
            }
        });

	    /**
	     * Close when user clicks outside of the submenu.
	     *
	     * @param {object} links - Submenus.
	     */
			document.addEventListener("click", (event) => {
			  if (
			    !event.target.classList.contains("menu-main--submenu")
			  ) {
			    closeAllSubmenus();
			  }
			});

        // Adding keyboard navigation support (Escape key to close submenus)
        menuWrapper.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
                closeAllSubmenus();
            }
        });

        // Set label on submenus with children
        for (const submenu of menuWrapper.querySelectorAll('.menu-item-has-children')) {
            setSubmenuLabel(submenu);
        }
    }
};
