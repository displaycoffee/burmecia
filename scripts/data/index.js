/* Scripts */
import { breakpoints } from './breakpoints.js';
import { colors } from './colors.js';
import { fallbacks } from './fallbacks.js';
import { favicons } from './favicons.js';
import { fonts } from './fonts.js';

/* Shared data for the generate scripts */
/* Note: navigation isn't included since it needs a vite server - import it from ./navigation.js where needed */
export { site } from './site.js';
export { targets } from './targets.js';

export const theme = {
	breakpoints,
	colors,
	fallbacks,
	favicons,
	fonts,
};
