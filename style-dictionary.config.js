import StyleDictionary from 'style-dictionary';

/* Section banners and explicit output order per category, matching the original hand-written _theme.scss.
   Order is spelled out here (rather than trusting JSON/object key order) since plain numeric keys like
   "01".."12" get silently reordered by JS — integer-like keys always enumerate in ascending numeric order
   ahead of string keys, so "10", "11", "12" would jump in front of "01"-"09" otherwise. */
const sections = {
	breakpoint: { title: 'BREAKPOINTS', note: 'set without unit', order: ['01', '02', '03', '04'] },
	container: { title: 'CONTAINERS', order: ['base'] },
	spacing: { title: 'SPACING', order: ['x1', 'x2', 'x3', 'x4', 'x5', 'x6', 'x7', 'x8', 'x10', 'x12'] },
	color: { title: 'COLORS', order: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'] },
	font: {
		title: 'FONTS',
		order: ['path', 'family-01', 'family-02', 'weight-01', 'weight-02', 'style', 'transform', 'size-global', 'size-base'],
	},
	icon: { title: 'ICONS', order: ['size'] },
};

/* Renamed here since "breakpoint" tokens use a shortened "bp" variable prefix */
const prefixes = {
	breakpoint: 'bp',
};

/* Prints a token's Sass value as-is, except tokens explicitly typed "string" which need quoting.
   Color tokens are the exception: they alias a CSS custom property instead of a literal value (see
   buildCustomProperties below), so the same theme-aware color can be swapped at runtime without a
   rebuild. Unset ("false") slots stay literal false — they're read by if-exists mixins, not painted. */
const printValue = (token, category) => {
	if (category === 'color') return token.$value === false ? 'false' : `var(--${['color', ...token.path.slice(1)].join('-')})`;
	return token.$type === 'string' ? `'${token.$value}'` : token.$value;
};

/* Sass's rgba($color, $alpha) shorthand only works on a real Sass color — once a token is aliased to
   var(--color-N) that breaks, since Sass can't introspect a custom property's value at compile time.
   So alongside each hex color we also expose its R, G, B channels as their own custom property, letting
   call sites compose alpha themselves in plain CSS: rgba(var(--color-N-rgb), 50%). */
const hexToRgbChannels = (hex) => {
	const match = /^#([0-9a-f]{6})$/i.exec(hex);
	if (!match) return null;
	const value = parseInt(match[1], 16);
	return [(value >> 16) & 255, (value >> 8) & 255, value & 255].join(', ');
};

/* Renders "--color-N: value;" (plus a "--color-N-rgb: r, g, b;" companion for hex colors) per token */
const declarations = (tokens, pickValue, depth) => {
	const tabs = '\t'.repeat(depth);
	return tokens
		.flatMap((token) => {
			const value = pickValue(token);
			const lines = [`${tabs}--color-${token.path[1]}: ${value};`];
			const rgb = hexToRgbChannels(value);
			if (rgb) lines.push(`${tabs}--color-${token.path[1]}-rgb: ${rgb};`);
			return lines;
		})
		.join('\n');
};

/* Builds the light (:root), OS-preference-dark, and explicit [data-theme="dark"]-override custom property
   blocks from the color tokens. Only tokens carrying a $extensions.dark value differ between themes — the
   rest inherit their :root value through normal CSS cascade, so they're only declared once. */
const buildCustomProperties = (colorTokens) => {
	const rootTokens = colorTokens.filter((token) => token.$value !== false);
	const darkTokens = colorTokens.filter((token) => token.$extensions?.dark);

	return [
		':root {',
		declarations(rootTokens, (token) => token.$value, 1),
		'}',
		'',
		'/* Follows the OS/browser preference by default... */',
		'@media (prefers-color-scheme: dark) {',
		"\t:root:not([data-theme='light']) {",
		declarations(darkTokens, (token) => token.$extensions.dark, 2),
		'\t}',
		'}',
		'',
		'/* ...but an explicit data-theme attribute (e.g. a manual toggle) always wins over that preference. */',
		"[data-theme='dark'] {",
		declarations(darkTokens, (token) => token.$extensions.dark, 1),
		'}',
	].join('\n');
};

StyleDictionary.registerFormat({
	name: 'scss/theme',
	format: ({ dictionary }) => {
		const byName = new Map();
		dictionary.allTokens.forEach((token) => {
			byName.set(token.path.join('.'), token);
		});

		const colorTokens = sections.color.order.map((key) => byName.get(`color.${key}`));

		const blocks = Object.keys(sections).map((category) => {
			const { title, note, order } = sections[category];
			const prefix = prefixes[category] ?? category;

			const banner = [`//// ${title}`, '//// --------------------------------------------------------------------------'];
			if (note) banner.push(`//// Note: ${note}`);

			const variables = order.map((key) => {
				const token = byName.get(`${category}.${key}`);
				const name = [prefix, key].join('-');
				const comment = token.$description ? ` // ${token.$description}` : '';
				return `\t$${name}: ${printValue(token, category)};${comment}`;
			});

			return [...banner, '', ...variables].join('\n');
		});

		return [buildCustomProperties(colorTokens), '', blocks.join('\n\n')].join('\n') + '\n';
	},
});

export default {
	source: ['tokens/**/*.json'],
	usesDtcg: true,
	platforms: {
		scss: {
			transformGroup: 'scss',
			buildPath: 'src/_config/styles/theme/',
			files: [
				{
					destination: '_theme.scss',
					format: 'scss/theme',
				},
			],
		},
	},
};
