<?php

/**
 * @file
 * Functions to add misc preprocess to the ThinkShout Motif theme.
 */

use Drupal\block\Entity\Block;
use Drupal\ts_motif\Motif;

/**
 * Implements hook_preprocess().
 */
function ts_motif_preprocess(&$variables) {
  $variables['svg_icon_path'] = \Drupal::theme()->getActiveTheme()->getPath() . Motif::ICON_PATH;
}

/**
 * Implements hook_theme_suggestions_HOOK_alter() for block.
 */
function ts_motif_theme_suggestions_block_alter(array &$suggestions, array $variables) {
  $original_hook = $variables['theme_hook_original'];
  // Provide suggestion for block templates by custom block type.
  if (!empty($variables['elements']['content']['#block_content'])) {
    /** @var \Drupal\block_content\Entity\BlockContent $block_content */
    $block_content = $variables['elements']['content']['#block_content'];
    // Add `block--BLOCK-TYPE.html.twig`.
    $suggestions[] = 'block__' . $block_content->bundle();
    $view_mode = $variables['elements']['#configuration']['view_mode'];
    if (!empty($view_mode)) {
      // Add `block--BLOCK-TYPE--VIEW-MODE.html.twig`.
      $suggestions[] = $original_hook . '__' . $block_content->bundle() . '__' . $view_mode;
    }
  }

  if (!empty($variables['elements']['#id'])) {
    /** @var \Drupal\block\Entity\Block $block */
    $block = Block::load($variables['elements']['#id']);
    $base_plugin_id = $variables['elements']['#base_plugin_id'];
    $region = $block->getRegion();

    $suggestions[] = $original_hook . '__' . $region;
    $suggestions[] = $original_hook . '__' . $region . '__' . 'base' . '__' . $base_plugin_id;
    $suggestions[] = $original_hook . '__' . $region . '__' . 'id' . '__' . $variables['elements']['#id'];
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter() for menu.
 */
function ts_motif_theme_suggestions_menu_alter(array &$suggestions, array $variables) {
  // Add a new base hook for menus. Original base hook is not in suggestions,
  // Which causes any new suggestions here to have less precedence.
  $suggestions[] = $variables['theme_hook_original'] . '__' . 'base';
  if (!empty($variables['attributes']['data-block-region'])) {
    $suggestions[] = 'menu' . '__region__' . str_replace('-', '_', $variables['attributes']['data-block-region']);
    $suggestions[] = $variables['theme_hook_original'] . '__region__' . str_replace('-', '_', $variables['attributes']['data-block-region']);
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter() for form templates.
 */
function ts_motif_theme_suggestions_form_alter(array &$suggestions, array $variables) {
  if ($variables['element']['#form_id'] === 'search_block_form') {
    $suggestions[] = 'form__search_block_form';
  }
}

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function ts_motif_theme_suggestions_user_alter(&$suggestions, $variables) {
  $suggestions[] = 'user__' . $variables['elements']['#view_mode'];
}
