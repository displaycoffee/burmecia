/* React */
import { ReactNode } from 'react';

/* Type definitions */
type SlideoutButtonProps = {
	outside: boolean;
	show: boolean;
};

/* Export types */
export type SlideoutOverlayProps = SlideoutProps;

export type SlideoutProps = {
	options: {
		button: SlideoutButtonProps;
		closeOnClick: boolean;
		content: ReactNode;
		direction?: string;
		id: string;
		isDesktop: boolean;
		label: string;
		orientation?: string;
		width?: number;
	};
};
