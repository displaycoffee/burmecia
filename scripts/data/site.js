/* Scripts */
import packageJSON from '../../package.json' with { type: 'json' };

export const site = {
	name: packageJSON.displayName || '',
	description: packageJSON.description || '',
	url: packageJSON.homepage || 'https://localhost:3000',
};
