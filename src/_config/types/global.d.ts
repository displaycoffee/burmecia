/* React */
import { ReactNode } from 'react';

declare global {
	type Page = {
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
	type PageProps = {
		url: string;
	};
	type ChildPageProps = {
		url: string;
		childPages: Page[];
	};
}

export {};
