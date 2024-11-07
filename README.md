# Motif

A base theme for a Drupal sites.
[Learn more about the theme in the wiki.](https://github.com/thinkshout/ts_motif/wiki)

## Initial Setup

After copying this repository into your project's `web/themes/custom` directory, you need to do some initialization steps to pull in the base build. Most of this is handled by a script.

1. Decide on a machine name (no spaces or unusual characters other than `_`) for this theme. It should generally include your project's name or other unique identifier.
2. Open a terminal window and `cd` into this copied theme: `cd ~/Sites/PROJECTNAME/web/themes/custom/ts_motif`
3. If you cloned the git repository to copy this theme, remove the link to this repository by deleting the `.git` directory: `rm -rf .git`
4. Run the naming script: `./update_theme_name.sh YOUR_THEME_NAME`
5. Run the scaffolding script to pull in the contents of the base-assets repository and organize theme: `composer scaffold`
6. Assuming you have already installed the site and have a database, enable the "ts_styleguide" module, or add it to `config/core.extension.yml`, and configure Drupal to use your new theme by visiting `admin/appearance` as a site admin, where you can enable it and set it to be the default.

You should now be able to see a starter styleguide at `/styleguide`.

## Style Guide

A style guide is available at /styleguide. The [ts_styleguide](https://github.com/thinkshout/ts_styleguide) package has the module available to create the
route. The template is editable and found in `templates/pages/page-style-guide.html.twig`

## Installation

- Run `npm install` to install dependencies.

Install will check the node version against the `.nvmrc` file, install all dependencies, and populate a prod build.

## Theme Development

For most development tasks, simply run `npm start` to start Parcel's watch, which will compile the projects CSS and
JavaScript as well as Tailwind in JIT mode.

Additionally, there are a number of scripts to aid in theme development:

- `npm run build` to compile css, js, and print css for production.
- `npm run format`: Formats assets, tokens, and SVG files.
- `npm run lint`: to check styling errors in js/css files. Ran automatically if you 
commit while inside the theme directory.
- `npm run print.bundle` Bundle the print stylesheet for production.
- `npm run theme.bundle.prod` Create the production build.
- `npm run theme.bundle.dev` Create the development build.
- `npm run start` Start the watch of the project in development mode.

## Configure PhpStorm for PostCSS

- Install Plugin [phpstorm](https://plugins.jetbrains.com/plugin/8578-postcss)
- Install Plugin. Save and exit preferences.
- Reopen preferences. Go to Languages & Frameworks / Style Sheets / Dialects
- Add PostCSS as the dialect for the theme directory

## Husky

This project is set up with Husky to lint code and commit messages using eslint and conventional commits and
[commitlint](https://github.com/conventional-changelog/commitlint). See [.husky](.husky) directory to configure. The
short version:

```
git commit -m "type: description"
```

### Commit Types

- build: Changes that affect the build system or external dependencies.
- ci: Changes to our CI configuration files and scripts.
- docs: Documentation only changes.
- feat: A new feature.
- fix: A bug fix.
- perf: A code change that improves performance.
- refactor: A code change that neither fixes a bug nor adds a feature.
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.).
- test: Adding missing tests or correcting existing tests.
