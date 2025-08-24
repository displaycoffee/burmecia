/* React */
import { createContext, PropsWithChildren } from 'react';

/* Local scripts */
import { theme } from '../_config/scripts/theme';
import { utils } from '../_config/scripts/utils';
import { variables } from '../_config/scripts/variables';

/* Context value types */
type ContextValues = {
	theme: {};
	utils: {};
	variables: {};
};

/* Create context */
export const Context = createContext({} as ContextValues);

/* Create Context.Provider wrapper */
export const ContextProvider = ({ children }: PropsWithChildren) => {
	const values: ContextValues = {
		theme,
		utils,
		variables,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};
