/* Packages */
import { useState } from 'react';

/* Components */
import { Toggle } from '../forms/Forms';

/* Theme toggle
   Note: everything for the toggle lives in this file, so it can be removed by deleting this folder and <ThemeToggle />.
   Note: the saved theme is applied when this module loads (before React renders), not from index.html, so a saved theme
   that differs from the OS preference can briefly show the OS theme on page load. */

/* Type definitions */
type Theme = 'light' | 'dark';

/* Settings */
const storageKey = 'theme';

/* localStorage can throw (e.g. blocked storage or some private browsing modes), so reads and writes fail quietly */
const getStoredTheme = (): Theme | null => {
	try {
		const stored = localStorage.getItem(storageKey);
		return stored === 'light' || stored === 'dark' ? stored : null;
	} catch {
		return null;
	}
};

const setStoredTheme = (theme: Theme) => {
	try {
		localStorage.setItem(storageKey, theme);
	} catch {
		// Not saved, but still applied for this page view
	}
};

const getSystemTheme = (): Theme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

/* Apply a saved theme as early as possible (the generated :root[data-theme] styles take it from here) */
const storedTheme = getStoredTheme();
if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);

export const ThemeToggle = () => {
	const [theme, setTheme] = useState<Theme>(() => storedTheme ?? getSystemTheme());

	// Flip the theme, save it, and apply it immediately
	const toggleTheme = () => {
		const next: Theme = theme === 'dark' ? 'light' : 'dark';
		setTheme(next);
		setStoredTheme(next);
		document.documentElement.setAttribute('data-theme', next);
	};

	return <Toggle active={theme === 'dark'} id={'theme-toggle'} label={`${theme === 'dark' ? 'Dark' : 'Light'} mode`} onChange={toggleTheme} />;
};
