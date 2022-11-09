(function (Drupal,drupalSettings) {
  "use strict";

  /**
   * Displays code samples as code snippets.
   */
  Drupal.behaviors.tsPatternsHtml = {
    attach: function (context, settings) {
      if (context === document) {
        const patterns = document.querySelectorAll(".ts-pattern");
        patterns.forEach((pattern) => {
          let codeDiv = pattern.nextElementSibling;
          let patternCode = pattern.innerHTML.replaceAll('<','<span><</span>').replace('>','<span>></span>'));
          codeDiv.innerHTML= patternCode;
        });
      }
    },
  };
})(Drupal,drupalSettings);
