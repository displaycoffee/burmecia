/* React */
import { RefObject, useEffect, useId, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/* Variables for useBodyClass */
const bodyPrefix = 'page-';
const bodySelector = document.querySelector('body');
let previousPage = '';

export const useBodyClass = (defaultPrefix: string) => {
	const location = useLocation();

	useEffect(() => {
		if (!bodySelector) return;

		// Remove any previous body class
		bodySelector.classList.remove(`${bodyPrefix}${previousPage || defaultPrefix}`);

		// Update previous location path
		// Replace any body prefix, remove first slash, and replace any other slash with hyphen
		previousPage = location.pathname.replace(bodyPrefix, '').replace('/', '').replace(/\//g, '-');

		// Add new body class
		bodySelector.classList.add(`${bodyPrefix}${previousPage || defaultPrefix}`);
	}, [location, defaultPrefix]);

	return null;
};

export const useClickOutside = (callback: () => void) => {
	const clickRef: RefObject<HTMLDivElement | null> = useRef(null);

	// Determine if a click has been performed outside an element
	useEffect(() => {
		const handleClickOutside = (e: Event) => {
			if (clickRef.current && !clickRef.current.contains(e.target as Node)) {
				callback();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [clickRef, callback]);

	return clickRef;
};

export const useFormattedId = () => {
	// Updates the format of useId hook
	const id = useId();
	return id.slice(1, -1).replace(/^_|_$/g, '').replace(/_/g, '-');
};

export const useRespond = (bp: number) => {
	const [match, setMatch] = useState(() => window.matchMedia(`(min-width: ${bp}px)`).matches);

	// Update match state on media change
	useEffect(() => {
		const mediaQuery = window.matchMedia(`(min-width: ${bp}px)`);
		const handler = (e: MediaQueryListEvent) => setMatch(e.matches);
		mediaQuery.addEventListener('change', handler);
		return () => mediaQuery.removeEventListener('change', handler);
	}, [bp]);

	return match;
};
