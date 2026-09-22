/* Scripts */
import packageJSON from './package.json' with { type: 'json' };
import { navigationHeader } from './src/components/navigation/scripts/navigation.ts';
import { navigationUtils } from './src/components/navigation/scripts/navigation-utils.ts';

const hostname = packageJSON.homepage || 'https://localhost:3000';
const location = new URL(hostname);

// Flatten nav items (and nested children) into a plain list of internal urls. Home ('/') is
// excluded since vite-plugin-sitemap already finds it by scanning the built dist/index.html;
// external urls (e.g. a nav item pointing off-site) are excluded since they don't belong in
// this site's sitemap and would otherwise get mangled together with the hostname; items with
// includeInSiteMap set to false are excluded too. This check is per item, not cascading — a
// parent opting out doesn't opt its children out, each item's own flag is what's checked
const flattenUrls = (items) => {
	return items.flatMap((item) => {
		const isInternal = item.url.startsWith('/');
		const urls = item.includeInSiteMap && isInternal && item.url != '/' ? [item.url] : [];
		return item.children ? [...urls, ...flattenUrls(item.children)] : urls;
	});
};

let sitemap = {
	hostname: location.origin,
	readable: true,
	exclude: ['/assets', '/assets/css', '/assets/fonts', '/assets/images', '/assets/images/test', '/assets/images/theme', '/assets/js'],
	dynamicRoutes: flattenUrls(navigationUtils.get.list(navigationHeader)),
};

if (location?.pathname && location.pathname != '/') sitemap.basePath = location.pathname;

export const sitemapConfig = sitemap;
