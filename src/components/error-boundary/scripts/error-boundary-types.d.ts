/* React */
import { ReactNode } from 'react';

/* Export types */
export type ErrorBoundaryProps = {
	children: ReactNode;
	message: ReactNode;
};

export type ErrorBoundaryState = {
	hasError: boolean;
};
