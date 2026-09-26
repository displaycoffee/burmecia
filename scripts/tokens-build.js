/* Packages */
import StyleDictionary from 'style-dictionary';

/* Get a token's dark value from $extensions.dark (tokens without one keep their light value) */
const getDark = (token) => token.$extensions?.dark ?? token.original?.$extensions?.dark;

/* Breakpoints can't be custom properties since var() doesn't work in media queries, so they're output as plain Sass values */
const isBreakpoint = (token) => token.path[0] === 'breakpoint';

/* Set comment for generated files */
const comment = `// Do not edit directly, this file was auto-generated.`;

/* Format tokens as :root custom properties with light / dark values */
/* Note: this outputs CSS, so it should only be imported once (in container.scss) */
StyleDictionary.registerFormat({
	name: 'scss/theme-properties',
	format: ({ dictionary }) => {
		const tokens = dictionary.allTokens.filter((token) => !isBreakpoint(token));
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
		return `${comment}\n\n${blocks.join('\n\n')}`;
	},
});

/* Format tokens as Sass variables that point to their custom properties (breakpoints get their plain value) */
/* Note: this outputs no CSS, so it's safe to @use in any stylesheet */
StyleDictionary.registerFormat({
	name: 'scss/theme-variables',
	format: ({ dictionary }) => {
		const sassVars = dictionary.allTokens
			.map((token) => `$${token.name}: ${isBreakpoint(token) ? token.$value : `var(--${token.name})`};`)
			.join('\n');
		return `${comment}\n\n${sassVars}`;
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
			if (dark) theme[category][`${key}-dark`] = dark;
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
					format: 'json/theme', // Compiles to { "color": { "bg": "#fdfdfd", "bg-dark": "#1a1a1a" } } for scripts/config.js
				},
			],
		},
	},
});

await sd.buildAllPlatforms();

console.log('🚀 Successfully built tokens into src/_core/styles/theme/_tokens.scss, _root.scss, and tokens/theme.json.');
