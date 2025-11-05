#! /bin/bash

# our own little yeoman
#
# This script works on a theme that was started by cloning renamed_theme.
# If the theme still has the name renamed_theme sprinkled throughout, this does the
# job of changing those instances of 'renamed_theme' to the new theme name.
# It also renames the directory from renamed_theme to the new theme name if it is
# not already re-named.
#
# call like this:
# > ./update_theme_name.sh my_new_theme_name
#

  THEME_NAME=$1
  if [[ $# -eq 0 ]] ; then
    echo 'A new theme name is required. Call like this:'
    echo './update_theme_name.sh my_new_theme_name'
    exit 0
  fi

  echo Theme name is $THEME_NAME
  # assumes the currently running script is inside the renamed_theme directory that will be re-named
  THEME_DEST="$( cd "$(dirname "$0")" ; cd ..; pwd -P )"/$THEME_NAME
  CURRENT_DIR="$(pwd -P )"
  echo "Theme will be placed in $THEME_DEST"

  if [ $THEME_DEST != $CURRENT_DIR ]
  then
    echo Renaming the theme directory
    mv $CURRENT_DIR $THEME_DEST
  fi

  # Go through files and edit them replacing renamed_theme with the new theme name
  # The "sed" command replaced the thing between "s/" and the middle "/" with the thing
  # after the middle "/" and the "/g". Its used both to generate new filenames and to
  # edit the contents of files.

  for file in $THEME_DEST/*ts_motif*
    do
      echo Renaming ${file}
      newfile="$(echo ${file} | sed -e "s/ts_motif/${THEME_NAME}/g")" ;
      mv $file $newfile
  done

  for file in $THEME_DEST/*.*
    do
      if [[ $file != *.svg ]]
      then
        if [[ $file != *.png ]]
        then
          echo Updating ${file}
          mv $file $file.child
          sed "s/ts_motif/${THEME_NAME}/g" $file.child > $file
          rm $file.child
        fi  
      fi
  done

  # Rename & edit config files
  echo Renaming \& updating config/install/ts_motif.settings.yml
  mv $THEME_DEST/config/install/ts_motif.settings.yml $THEME_DEST/config/install/${THEME_NAME}.settings.yml

  echo Renaming \& updating configs in config/optional/
  for file in $THEME_DEST/config/optional/*ts_motif*yml
    do
      newfile="$(echo ${file} | sed -e "s/ts_motif/${THEME_NAME}/g")" ;
      sed "s/ts_motif/${THEME_NAME}/g" $file > $newfile
      rm $file
  done

  # self modifying code
  echo Updating this script so it can be run again if you want to change the name again.
  mv $THEME_DEST/update_theme_name.sh $THEME_DEST/update_theme_name.child
  sed "s/ts_motif/${THEME_NAME}/g" update_theme_name.child | \
  sed "s/ts_motif/${THEME_NAME}/g" | \
  sed "s/ts_motif/${THEME_NAME}/g" >$THEME_DEST/update_theme_name.sh
  chmod a+x $THEME_DEST/update_theme_name.sh
  rm $THEME_DEST/update_theme_name.child

  echo RENAME COMPLETE. Run `cd .`
