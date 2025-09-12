/* React */
import { ReactNode } from 'react';

/* Export prop types */
export type ErrorBoundaryProps = {
	children: ReactNode;
	message: ReactNode;
};

export type ErrorBoundaryState = {
	hasError: boolean;
};
