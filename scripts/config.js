import { createServer } from 'vite';
import packageJSON from '../package.json' with { type: 'json' };

// Note: theme.ts pulls in a .scss CSS-module export, which only plain `node` can't
// process on its own — load it through Vite's SSR pipeline instead so the
// same transforms (Sass, CSS modules) apply as in the app itself.
const viteServer = await createServer({
	server: { middlewareMode: true },
	appType: 'custom',
});
const { theme } = await viteServer.ssrLoadModule('/_core/scripts/theme.ts');
await viteServer.close();

// Paths
const fontsPath = '/assets/fonts/';

export const config = {
	site: {
		name: packageJSON.displayName || '',
		description: packageJSON.description || '',
		url: packageJSON.homepage || 'https://localhost:3000',
	},
	targets: [
		{
			name: `index`,
			file: `./targets/index/Index.tsx`,
			hasTabindex: true,
			isScript: true,
		},
		{
			name: `portal`,
			file: `./targets/portal/Portal.tsx`,
			hasTabindex: false,
			isScript: false,
		},
	],
	theme: {
		...theme,
		fonts: [
			{
				family: `Open Sans`,
				file: `${fontsPath}open-sans-regular.woff2`,
				weight: `normal`,
				style: `normal`,
				display: `swap`,
			},
			{
				family: `Open Sans`,
				file: `${fontsPath}open-sans-italic.woff2`,
				weight: `normal`,
				style: `italic`,
				display: `swap`,
			},
			{
				family: `Open Sans`,
				file: `${fontsPath}open-sans-bold.woff2`,
				weight: `700`,
				style: `normal`,
				display: `swap`,
			},
			{
				family: `Open Sans`,
				file: `${fontsPath}open-sans-bold-italic.woff2`,
				weight: `700`,
				style: `italic`,
				display: `swap`,
			},
			{
				family: `Montserrat`,
				file: `${fontsPath}montserrat-regular.woff2`,
				weight: `normal`,
				style: `normal`,
				display: `swap`,
			},
			{
				family: `Montserrat`,
				file: `${fontsPath}montserrat-italic.woff2`,
				weight: `normal`,
				style: `italic`,
				display: `swap`,
			},
			{
				family: `Montserrat`,
				file: `${fontsPath}montserrat-bold.woff2`,
				weight: `700`,
				style: `normal`,
				display: `swap`,
			},
			{
				family: `Montserrat`,
				file: `${fontsPath}montserrat-bold-italic.woff2`,
				weight: `700`,
				style: `italic`,
				display: `swap`,
			},
		],
	},
};
