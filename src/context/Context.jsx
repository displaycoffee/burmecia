/* React */
import { createContext } from 'react';

/* Local scripts */
import { theme } from '../_config/scripts/theme';
import { utils } from '../_config/scripts/utils';
import { variables } from '../_config/scripts/variables';

/* Create Context.Provider wrapper */
export const Context = createContext();

/* Create Context.Provider wrapper */
export const ContextProvider = ({ children }) => {
	const values = {
		theme,
		utils,
		variables,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};
