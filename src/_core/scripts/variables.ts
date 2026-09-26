/* Scripts */
import packageJSON from '../../../package.json' with { type: 'json' };

/* This config contains variables to use through application */
const directory = '/burmecia';
export const variables: VariablesType = {
	paths: {
		basename: typeof window == 'object' && window.location.pathname.includes(directory) ? directory : '',
	},
	site: {
		name: packageJSON?.displayName || '',
		description: packageJSON?.description || '',
		url: packageJSON?.homepage || 'https://localhost:3000',
	},
};
