import fs from 'fs';
import path from 'path';
import { config } from './config.js';
const { site, targets, theme } = config;
const { fonts } = theme;

// Path to your built index.html
const templatePath = path.resolve('./scripts/src-template.html');
const htmlPath = path.resolve('./src/index.html');

if (fs.existsSync(templatePath)) {
	let html = fs.readFileSync(templatePath, 'utf8');

	// Create font details
	const fontLinks = [];
	const fontFaces = [];

	fonts.forEach((font) => {
		fontLinks.push(`<link rel="preload" href="/assets/fonts/${font.file}" as="font" type="font/woff2" crossorigin="anonymous" />`);
		fontFaces.push(`@font-face {
			font-family: '${font.family}';
			src: url('${font.file}') format('woff2');
			font-weight: ${font.weight};
			font-style: ${font.style};
			font-display: ${font.display};
		}`);
	});

	// Create target details
	const targetScripts = [];
	const targetElements = [];

	targets.forEach((target) => {
		if (target.isScript) {
			targetScripts.push(`<script type="module" src="${target.file}"></script>`);
		}
		targetElements.push(target.hasTabindex ? `<div id="${target.name}" tabindex="-1"></div>` : `<div id="${target.name}"></div>`);
	});

	// Update head
	// Create head meta, links and scripts
	const head = `
		<title>${site.name}</title>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta name="description" content="${site.description}" />
		<meta property="og:title" content="${site.name}" />
		<meta property="og:site_name" content="${site.name}" />
		<meta property="og:url" content="${site.url}" />
		<meta property="og:locale" content="en_US" />
		<meta property="og:description" content="${site.description}" />
		<meta property="og:type" content="website" />
		<meta name="theme-color" content="${theme.colors.color03}" media="(prefers-color-scheme: light)" />
		<meta name="theme-color" content="${theme.colors.color04}" media="(prefers-color-scheme: dark)" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
		<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
		<link rel="icon" href="/favicon-92x92.png" type="image/png" sizes="92x92" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
		<link rel="manifest" href="/manifest.json" />
		${fontLinks.join('')}
		${targetScripts.join('')}
		<style id="preloaded-styles">
			@font-face {
				font-family: 'Fallback';
				src: local('Arial');
				size-adjust: 105%;
			}
			@font-face {
				font-family: 'Fallback Bold';
				src: local('Arial Black');
				size-adjust: 98%;
			}
			${fontFaces.join('')}
			.svg-hidden {
				position: absolute;
				width: 1px;
				height: 1px;
				padding: 0;
				margin: -1px;
				overflow: hidden;
			}
			.hide-mobile {
				display: none;
			}
			.hide-desktop {
				display: block;
			}
			@media only screen and (min-width: ${theme.bps.bp02}px) {
				.hide-mobile {
					display: block;
				}
				.hide-desktop {
					display: none;
				}
			}
		</style>
	`;
	const headRegex = /<!-- HEAD -->/g;
	html = html.replace(headRegex, (match, href) => {
		return head;
	});

	// Update targets
	const targetsRegex = /<!-- TARGETS -->/g;
	html = html.replace(targetsRegex, (match, href) => {
		return targetElements.join('');
	});

	// Build html
	fs.writeFileSync(htmlPath, html);

	console.log('🚀 Successfully built src/index.html. Re-build to generate new src code.');
} else {
	console.error('❌ Error: scripts/src-template.html not found.');
}
