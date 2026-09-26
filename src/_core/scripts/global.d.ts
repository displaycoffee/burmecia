/* Packages */
import type { SyntheticEvent } from 'react';
import type themeJSON from '../../../tokens/theme.json';

/* Type definitions */
type Events = SyntheticEvent | Event;

type ObjectString = {
	[key: string]: string;
};

type ObjectPrimitive = {
	[key: string]: Primitive;
};

type Primitive = string | number | boolean;

type Theme = {
	breakpoints: (typeof themeJSON)['breakpoint'];
	colors: (typeof themeJSON)['color'];
};

type Utils = {
	getLast: (value: string | string[], delimeter?: string) => string | number;
	getPage: () => string;
	handleize: (value: string) => string;
	isSticky: (element: HTMLElement | null, stickyClass: string) => void;
	scrollTo: (e?: Events, selector?: string, offset?: number) => void;
	setAttributes: (element: HTMLElement, attributes: ObjectString) => void;
	stripHTML: (string: string) => string;
	truncate: (string: string, limit: number) => string;
};

type Variables = {
	paths: {
		basename: string;
	};
	site: {
		name: string;
		description: string;
		url: string;
	};
};

declare global {
	// Declare global types
	type EventsType = Events;

	type ObjectStringType = ObjectString;

	type ObjectPrimitiveType = ObjectPrimitive;

	type ThemeType = Theme;

	type UtilsType = Utils;

	type VariablesType = Variables;

	// Declare global prop types
	type ObjectPrimitiveProps = ObjectPrimitive;
}

/* Export global types */
export {};
