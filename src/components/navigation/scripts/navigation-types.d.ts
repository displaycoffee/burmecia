/* Packages */
import type { ComponentType, ReactNode } from 'react';

/* Type definitions */
type Navigation = {
	children?: Navigation[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- lazy route components have differing prop shapes
	element?: ComponentType<any>;
	id: number;
	isRoute?: boolean;
	label: string;
	props?: ObjectPrimitiveType;
	showInNav?: boolean;
	url: string;
};

type NavigationComponent = {
	disableTransition?: boolean;
	label: string;
};

type NavigationListItem = {
	children?: ReactNode;
	disableTransition: boolean;
	nav: Navigation;
	navigationLinkClass: string;
	parent?: string;
};

type NavigationRoutes = {
	children?: NavigationRoutes[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- lazy route components have differing prop shapes
	element: ComponentType<any>;
	id: number;
	path: string;
	props?: ObjectPrimitiveType;
};

/* Export types */
export type NavigationRoutesType = NavigationRoutes;

export type NavigationType = Navigation;

/* Export prop types */
export type NavigationComponentProps = NavigationComponent;

export type NavigationListItemProps = NavigationListItem;

export type NavigationRoutesProps = NavigationRoutes;
