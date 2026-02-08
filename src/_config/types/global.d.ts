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
}

/* Export global types */
export {};
