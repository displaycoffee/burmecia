/* Type definitions */
type Navigation = {
	alt?: string;
	children?: Navigation[];
	id: number;
	isRoute?: boolean;
	label: string;
	showInNav?: boolean;
	url: string;
};

type NavigationListItem = {
	children?: ReactNode;
	isActive: boolean;
	nav: Navigation;
	parent?: string;
};

type NavigationMap = {
	[key: string]: JSX.Element;
};

type NavigationRoutes = {
	children?: NavigationRoutes[];
	element: JSX.Element;
	id: number;
	path: string;
};

/* Export types */
export type NavigationMapType = NavigationMap;

export type NavigationRoutesType = NavigationRoutes;

export type NavigationType = Navigation;

/* Export prop types */
export type NavigationListItemProps = NavigationListItem;

export type NavigationRoutesProps = NavigationRoutes;
