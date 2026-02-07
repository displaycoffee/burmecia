/* React */
import { ReactNode, SyntheticEvent } from 'react';

/* Declare global types */
declare global {
	type ChildPagesType = {
		url: string;
		childPages: PageType[];
	};

	type EventType = SyntheticEvent | Event;

	type ObjectStringType = {
		[key: string]: string;
	};

	type ObjectPrimitiveType = {
		[key: string]: string | number | boolean;
	};

	type PageType = {
		alt?: string;
		children?: PageType[];
		component: JSX.Element;
		id: number;
		isRoute?: boolean;
		label: string;
		showInNav?: boolean;
		url: string;
	};
}

/* Export global types */
export {};
