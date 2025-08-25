/* React */
import { ReactNode, SyntheticEvent } from 'react';

declare global {
	type EventType = SyntheticEvent | Event;
	type PageType = {
		alt?: string;
		component: JSX.Element;
		id: number;
		hasChildren?: boolean;
		isRoute?: boolean;
		label: string;
		showInNav?: boolean;
		url: string;
		props?: {
			[key: string]: string | number | boolean;
		};
	};
	type ChildPagesType = {
		url: string;
		childPages: PageType[];
	};
}

export {};
