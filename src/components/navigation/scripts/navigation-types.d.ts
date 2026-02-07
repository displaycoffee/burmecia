/* React */
import { ReactNode } from 'react';

/* Export prop types */
export type NavigationListItemProps = {
	children?: ReactNode;
	isActive: boolean;
	nav: PageType;
	parent?: string;
};
