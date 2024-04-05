#! /bin/bash

# our own little yeoman
#
# This script works on a theme that was started by cloning ts_motif.
# If the theme still has the name ts_motif sprinkled throughout, this does the
# job of changing those instances of 'ts_motif' to the new theme name.
# It also renames the directory from ts_motif to the new theme name if it is
# not already re-named.
#
# call like this:
# > update_theme_name.sh my_new_theme_name
#

  THEME_NAME=$1
  if [[ $# -eq 0 ]] ; then
    echo 'A new theme name is required. Call like this:'
    echo './update_theme_name.sh my_new_theme_name'
    exit 0
  fi

  echo Theme name is $THEME_NAME
  # assumes the currently running script is inside the ts_motif directory that will be re-named
  THEME_DEST="$( cd "$(dirname "$0")" ; cd ..; pwd -P )"/$THEME_NAME
  CURRENT_DIR="$(pwd -P )"
  echo "Theme will be placed in $THEME_DEST"

  if [ $THEME_DEST != $CURRENT_DIR ]
  then
    mv $CURRENT_DIR $THEME_DEST
  fi

  PROJECT_NAME=$(echo $THEME_DEST | sed 's:.*/\(.*\)/web/.*:\1:g')

  # go through files and edit them replacing ts_motif with the new theme name
  sed "s/ts_motif_/${THEME_NAME}_/g" $THEME_DEST/ts_motif.theme >$THEME_DEST/$THEME_NAME.theme
  rm $THEME_DEST/ts_motif.theme

  sed "s/name: Motif/name: ${THEME_NAME}/g" $THEME_DEST/ts_motif.info.yml | sed "s/ts_motif/${THEME_NAME}/g" >$THEME_DEST/$THEME_NAME.info.yml
  rm $THEME_DEST/ts_motif.info.yml

  sed "s/ts_motif/${THEME_NAME}/g" $THEME_DEST/ts_motif.libraries.yml >$THEME_DEST/$THEME_NAME.libraries.yml
  rm $THEME_DEST/ts_motif.libraries.yml

  mv $THEME_DEST/composer.json $THEME_DEST/composer.child
  sed "s/ts_motif/${THEME_NAME}/g" $THEME_DEST/composer.child >$THEME_DEST/composer.json
  rm $THEME_DEST/composer.child

  mv $THEME_DEST/package.json $THEME_DEST/package.child
  sed "s/ts_motif/${THEME_NAME}/g" $THEME_DEST/package.child >$THEME_DEST/package.json
  rm $THEME_DEST/package.child

  # fix up the README file so it reflects the new theme name and location
  mv $THEME_DEST/README.md $THEME_DEST/README.md.child
  sed "s/# Motif/# ${THEME_NAME}/g" $THEME_DEST/README.md.child >$THEME_DEST/README.md
  rm $THEME_DEST/README.md.child

  # self modifying code
  mv $THEME_DEST/update_theme_name.sh $THEME_DEST/update_theme_name.child
  sed "s/ts_motif/${THEME_NAME}/g" update_theme_name.child | \
  sed "s/ts_motif/${THEME_NAME}/g" | \
  sed "s/ts_motif/${THEME_NAME}/g" >$THEME_DEST/update_theme_name.sh
  chmod a+x $THEME_DEST/update_theme_name.sh
  rm $THEME_DEST/update_theme_name.child