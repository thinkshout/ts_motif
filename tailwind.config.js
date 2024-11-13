const tokens     = require( './tokens/tailwind-tokens.json' );
const typography = require( './tokens/tailwind-typography.json' );
const grids = require('./tokens/tailwind-grids.json');
const btns = require('./tokens/tailwind-btns.json');
const site_spacing = require('./tokens/tailwind-site-spacing.json');
const plugin     = require( 'tailwindcss/plugin' );

module.exports = {
	prefix: '',
	content: [
		'./templates/**/*.{html,twig}',
		'./js/**/*.js',
	],
	theme: {
		colors: tokens.color,
		container: {
			center: true
		},
		fontFamily: tokens.font.family,
		fontSize: tokens.font.size,
		fontWeight: tokens.font.weight,
		lineHeight: tokens.lh,
		screens: tokens.screen,
		spacing: tokens.spacer,
		transitionDuration: tokens.duration,
		zIndex: tokens.z,
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
		plugin(
			function ({ addComponents, theme }) {
				addComponents({
					// Auto generate typography classes from keys in tailwind-typography.json
					// Loops through each key in the typography.style object and creates a new object with the key as the class name and the value as the styles
					...Object.keys(typography.style).map((key) => {
						return {
							[`${key}`]: typography.style[key],
						}
						// Reduce the mapped array of objects into a single object
					}).reduce((typographyStyles, newTypographyStyleObject) => ({ ...typographyStyles, ...newTypographyStyleObject }), {}),
					// Auto generate grid classes from keys in tailwind-grids.json
					// Loops through each key in the grids.grid object and creates a new object with the key as the class name
					// and the value as the styles
					...Object.keys(grids.grid).map((key) => {
						return {
							[`${key}`]: grids.grid[key],
						}
						// Reduce the mapped array of objects into a single object
					}).reduce((gridsStyles, newGridsStyleObject) => ({ ...gridsStyles, ...newGridsStyleObject }), {}),
					// Auto generate button classes from keys in tailwind-btns.json
					// Loops through each key in the btns.style object and creates a new object with the key as the class name
					// and the value as the styles
					...Object.keys(btns.btn).map((key) => {
						return {
							[`${key}`]: btns.btn[key],
						}
						// Reduce the mapped array of objects into a single object
					}).reduce((btnsStyles, newBtnsStyleObject) => ({ ...btnsStyles, ...newBtnsStyleObject }), {}),
					// Loops through each key in the site spacing.style object and creates a new object with the key as the class
					// name and the value as the styles
					...Object.keys(site_spacing.spacing).map((key) => {
						return {
							[`${key}`]: site_spacing.spacing[key],
						}
						// Reduce the mapped array of objects into a single object
					}).reduce((siteSpacingStyles, newSiteSpacingStyleObject) => ({ ...siteSpacingStyles, ...newSiteSpacingStyleObject }), {}),
					// Auto generate block level spacing classes from keys in tailwind-site-spacing.json
					// Loops through each key in the site_spacing.spacing object and creates a new object with the key as the
					// class name and the value as the styles
				});
			}
		)
	],
}
