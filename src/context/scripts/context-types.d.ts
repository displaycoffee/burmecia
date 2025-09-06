/* React */
import { ReactNode } from 'react';

/* Export types */
export type ContextProps = {
	children: ReactNode;
};

export type ContextValuesType = {
	theme: {
		[key: string]: ObjectPrimitiveType;
	};
	utils: {
		[key: string]: Function;
	};
	variables: {
		[key: string]: ObjectPrimitiveType;
	};
};
