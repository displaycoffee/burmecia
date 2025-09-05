/* React */
import { createContext, PropsWithChildren } from 'react';

/* Local scripts */
import { theme } from '../_config/scripts/theme';
import { utils } from '../_config/scripts/utils';
import { variables } from '../_config/scripts/variables';

/* Create context */
export const Context = createContext({} as ContextValuesType);

/* Create Context.Provider wrapper */
export const ContextProvider = ({ children }: PropsWithChildren) => {
	const values: ContextValuesType = {
		theme,
		utils,
		variables,
	};

	return <Context.Provider value={values}>{children}</Context.Provider>;
};

/* Types */
type ContextValueObjectType = {
	[key: string]: {
		[key: string]: string | number | boolean;
	};
};
type ContextValuesType = {
	theme: ContextValueObjectType;
	variables: ContextValueObjectType;
	utils: {
		[key: string]: Function;
	};
};
