export function render() {
  // Find all accordion sections
  const accordionSections = document.querySelectorAll(".accordion__section");
  // Loop through each section and add event listener
  accordionSections.forEach((accordionSection) => {
    // Find the accordion header
    const accordionHeader = accordionSection.querySelector(
      ".accordion__section__toggle"
    );
    // Add event listener to the accordion header
    accordionHeader.addEventListener("click", () => {
      // Toggle the accordion section
      accordionSection.classList.toggle("accordion__section--open");
    });
  });
}
