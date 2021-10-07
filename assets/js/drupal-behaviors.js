/**
 * @file
 * Theme behavior overrides.
 *   These overrides are processed by Parcel.
 */

(function ($, Drupal) {
  "use strict";

  /**
   * Behavior description.
   */
  Drupal.behaviors.Motif = {
    attach: function (context, settings) {
      console.log(
        "Motif has been ran. You can remove this log in assets/js/drupal-behaviors.js"
      );
    },
  };
})(jQuery, Drupal);
