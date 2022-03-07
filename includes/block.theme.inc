<?php

/**
 * @file
 * Functions to support theming blocks in the ThinkShout Motif theme.
 */

use Drupal\block\Entity\Block;
use Drupal\Component\Utility\Html;

/**
 * Implements hook_preprocess_block().
 */
function ts_motif_preprocess_block(&$variables) {
  $variables['title_attributes']['class'][] = 'block__title';
  $variables['attributes']['data-block-plugin-id'] = Html::getId(str_replace(':', '-', $variables['elements']['#plugin_id']));

  if (!empty($variables['elements']['#id'])) {
    $block = Block::load($variables['elements']['#id']);
    $region = $block->getRegion();
    $variables['content']['#attributes']['data-block-region'] = Html::getId($region);
  }
}
