/* Type definitions */
type Events = SyntheticEvent | Event;

type ObjectString = {
	[key: string]: string;
};

type ObjectPrimitive = {
	[key: string]: string | number | boolean;
};

type Theme = {
	bps: {
		bp01: string | number | boolean;
		bp02: string | number | boolean;
		bp03: string | number | boolean;
		bp04: string | number | boolean;
	};
};

type Utils = {
	getLast: (value: string | string[], delimeter?: string) => string | number;
	getPage: () => string;
	handleize: (value: string) => string;
	isSticky: (element: HTMLElement, stickyClass: string) => void;
	scrollTo: (e?: EventsType, selector?: string, offset?: number) => void;
	setAttributes: (element: HTMLElement, attributes: ObjectString) => void;
};

type Variables = {
	paths: {
		basename: string;
	};
};

declare global {
	/* Declare global types */
	type EventsType = Events;

	type ObjectStringType = ObjectString;

	type ObjectPrimitiveType = ObjectPrimitive;

	type UtilsType = Utils;

	type ThemeType = Theme;

	type VariablesType = Variables;

	/* Declare global prop types */
	type ObjectPrimitiveProps = ObjectPrimitive;
}

/* Export global types */
export {};
