/* React */
import { ReactNode } from 'react';

export type ErrorBoundaryProps = {
	children: ReactNode;
	message: ReactNode;
};

export type ErrorBoundaryState = {
	hasError: boolean;
};
