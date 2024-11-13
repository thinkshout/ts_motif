module.exports = {
	source: ["tokens/src/**/*.json"],
	format: {
		wordpressTheme: ({dictionary, platform}) => {
			const { color, font } = dictionary.tokens;
			const theme = {
				$schema: "https://schemas.wp.org/trunk/theme.json",
				version: 2,
				settings: {
					color: {
						custom: false,
						defaultPalette: false,
						palette: []
					},
					typography: {
						fontFamilies: [],
						fontSizes: [],
					},
					spacing: {
						customSpacingSize: false,
					},
					layout: {
						contentSize: "800px",
						wideSize: "1440px"
					},
					blocks: {}
				}
			};
			// Parse Color Tokens
			Object.keys(color).forEach(colorName => {
				if ( color[colorName].value ) {
					theme.settings.color.palette.push({
						slug: colorName,
						color: color[colorName].value,
						name: color[colorName].name.replace('Color', '').replace(/([A-Z])/g, ' $1').trim()
					});
				} else {
					const colorShades = color[colorName];
					Object.keys(colorShades).forEach(shadeName => {
						theme.settings.color.palette.push({
							slug: `${colorName}-${shadeName}`,
							color: colorShades[shadeName].value,
							name: `${colorName.charAt(0).toUpperCase() + colorName.slice(1)} ${shadeName.charAt(0).toUpperCase() + shadeName.slice(1)}`
						});
					});
				}
			});
			// Parse Font Family Tokens
			if ( font.family ) {
				Object.keys(font.family).forEach(familyName => {
					const { name, value, original } = font.family[familyName];
					const family = {
						fontFamily: value,
						name: name.replace('FontFamily', ''),
						slug: familyName
					};
					theme.settings.typography.fontFamilies.push(family);
					if ( original.wpBlocks ) {
						for (const wpBlock of original.wpBlocks) {
							theme.settings.blocks[wpBlock] = {
								typography: {
									fontFamilies: [family]
								}
							};
						}
					}
				});
			}
			// Parse Font Size Tokens
			if ( font.size ) {
				Object.keys(font.size).forEach(sizeName => {
					const { value } = font.size[sizeName];
					theme.settings.typography.fontSizes.push({
						slug: sizeName,
						size: value,
						name: sizeName
					});
				});
			}
			return JSON.stringify(theme, null, 2);
		}
	},
	platforms: {
		css: {
			transformGroup: "css",
			buildPath: "assets/",
			files: [
				{
					destination: "css/_elements/_generated-variables.css",
					format: "css/variables",
					options: {
						showFileHeader: false,
					}
				}
			]
		},
		js: {
			transformGroup: "js",
			buildPath: "assets/",
			files: [
				{
					destination: "js/components/_tokens.js",
					format: "javascript/module",
				}
			]
		},
		tailwind: {
			transformGroup: "js",
			buildPath: "./",
			files: [
				{
					destination: "tokens/tailwind-tokens.json",
					format: "json/nested"
				}
			]
		},
	}
}
