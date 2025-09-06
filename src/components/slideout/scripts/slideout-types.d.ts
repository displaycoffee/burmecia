/* React */
import { ReactNode } from 'react';

type SlideoutButtonProps = {
	outside: boolean;
	show: boolean;
};

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
