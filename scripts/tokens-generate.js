/* Packages */
import StyleDictionary from 'style-dictionary';
import { getReferences, usesReferences } from 'style-dictionary/utils';

/* Get a token's dark value from $extensions.dark (tokens without one keep their light value) */
const getDark = (token) => token.$extensions?.dark ?? token.original?.$extensions?.dark;

/* Static tokens are output as plain Sass values instead of custom properties, for values Sass needs at compile time */
/* Note: breakpoints are static since var() doesn't work in media queries, and spacing since it's used in Sass math (negatives, division, etc.) */
/* Other tokens can opt in individually with "$extensions": { "static": true } */
const staticCategories = ['breakpoint', 'spacing'];
const isStatic = (token) => staticCategories.includes(token.path[0]) || (token.$extensions?.static ?? token.original?.$extensions?.static) === true;

/* Tokens set to false aren't used in this project, so they're left out of :root and output as $name: false in Sass */
const isUnset = (token) => token.$value === false;

/* Fail the build if a token uses an unset (false) token inside a larger value, e.g. color-mix(in srgb, {color.unused} 50%, transparent) */
/* Note: a token that is only a reference to an unset token (e.g. "{color.unused}") resolves to false, so it's treated as unset itself */
const checkUnsetReferences = (dictionary) => {
	dictionary.allTokens.forEach((token) => {
		const original = token.original.$value;
		if (isUnset(token) || typeof original !== 'string' || !usesReferences(original)) return;

		const unsetReferences = getReferences(original, dictionary.tokens).filter(isUnset);
		if (unsetReferences.length !== 0) {
			const tokenPath = token.path.join('.');
			const referencePaths = unsetReferences.map((reference) => reference.path.join('.')).join(', ');
			throw new Error(`Token "${tokenPath}" references "${referencePaths}", which is set to false. Give it a value or update "${tokenPath}".`);
		}
	});
};

/* Set comment for generated files */
const comment = `// Do not edit directly, this file was auto-generated.`;

/* Format tokens as :root custom properties with light / dark values */
/* Note: this outputs CSS, so it should only be imported once (in container.scss) */
StyleDictionary.registerFormat({
	name: 'scss/theme-properties',
	format: ({ dictionary }) => {
		checkUnsetReferences(dictionary);
		const tokens = dictionary.allTokens.filter((token) => !isStatic(token) && !isUnset(token));
		const toProperty = (token, value) => `\t--${token.name}: ${value};`;
		const light = tokens.map((token) => toProperty(token, token.$value)).join('\n');
		const dark = tokens
			.filter(getDark)
			.map((token) => toProperty(token, getDark(token)))
			.join('\n');

		// Only output dark styles if at least one token has a dark value, so light-only projects keep native UI light
		const hasDark = dark.length !== 0;

		// Note: the dark block is output twice - once to follow the OS setting, once for a manual [data-theme] toggle
		const rootLight = `:root {\n\tcolor-scheme: ${hasDark ? 'light dark' : 'light'};\n${light}\n}`;
		const prefersDark = `@media (prefers-color-scheme: dark) {\n\t:root:not([data-theme='light']) {\n${dark.replace(/^/gm, '\t')}\n\t}\n}`;
		const rootDark = `:root[data-theme='dark'] {\n${dark}\n}`;
		const blocks = hasDark ? [rootLight, prefersDark, rootDark] : [rootLight];
		return `${comment}\n${blocks.join('\n\n')}`;
	},
});

/* Format tokens as Sass variables that point to their custom properties (static tokens get their plain value, unset tokens get false) */
/* Note: this outputs no CSS, so it's safe to @use in any stylesheet */
StyleDictionary.registerFormat({
	name: 'scss/theme-variables',
	format: ({ dictionary }) => {
		const sassVars = dictionary.allTokens
			.map((token) => `$${token.name}: ${isUnset(token) || isStatic(token) ? token.$value : `var(--${token.name})`};`)
			.join('\n');
		return `${comment}\n${sassVars}`;
	},
});

/* Format resolved token values as JSON for the build scripts, grouped by category (e.g. { color: { bg, bg-dark } }) */
StyleDictionary.registerFormat({
	name: 'json/theme',
	format: ({ dictionary }) => {
		const theme = {};

		dictionary.allTokens.forEach((token) => {
			const [category, ...path] = token.path;
			const key = path.join('-');
			const dark = getDark(token);
			theme[category] ??= {};
			theme[category][key] = token.$value;
			if (dark && !isUnset(token)) theme[category][`${key}-dark`] = dark;
		});

		return `${JSON.stringify(theme, null, '\t')}\n`;
	},
});

const sd = new StyleDictionary({
	// Path to your raw JSON token files
	// Note: theme.json is excluded because it's generated into the same folder by the json platform below
	source: ['tokens/!(theme).json'],
	platforms: {
		scss: {
			transformGroup: 'scss',
			buildPath: 'src/_core/styles/theme/',
			files: [
				{
					destination: '_root.scss',
					format: 'scss/theme-properties', // Compiles to :root { --variable-name: value; } with dark overrides
				},
				{
					destination: '_tokens.scss',
					format: 'scss/theme-variables', // Compiles to $variable-name: var(--variable-name);
				},
			],
		},
		json: {
			transformGroup: 'scss',
			buildPath: 'tokens/',
			files: [
				{
					destination: 'theme.json',
					format: 'json/theme', // Compiles to { "color": { "bg": "#fdfdfd", "bg-dark": "#1a1a1a" } }
				},
			],
		},
	},
});

await sd.buildAllPlatforms();

console.log('🚀 Successfully built tokens into src/_core/styles/theme/_tokens.scss, _root.scss, and tokens/theme.json.');
