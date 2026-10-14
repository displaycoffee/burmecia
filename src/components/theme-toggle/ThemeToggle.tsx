/* Styles */
import './styles/theme-toggle.scss';

/* Packages */
import type { ThemeMode } from '@displaycoffee/tokens';
import { useState } from 'react';

/* Scripts */
import { settings } from '@/_core/data/settings';

/* Components */
import { Icon } from '@/components/icons/Icons';

/* Theme toggle
   Note: everything for the toggle lives in this file, so it can be removed by deleting this folder and <ThemeToggle />.
   Note: the saved theme is applied when this module loads (before React renders), not from index.html, so a saved theme
   that differs from the OS preference can briefly show the OS theme on page load. */

/* Settings */
const storageKey = 'theme';

/* localStorage can throw (e.g. blocked storage or some private browsing modes), so reads and writes fail quietly */
const getStoredTheme = (): ThemeMode | null => {
	try {
		const stored = localStorage.getItem(storageKey);
		return stored === 'light' || stored === 'dark' ? stored : null;
	} catch {
		return null;
	}
};

const setStoredTheme = (theme: ThemeMode) => {
	try {
		localStorage.setItem(storageKey, theme);
	} catch {
		// Not saved, but still applied for this page view
	}
};

/* Start from the OS setting, or from the default theme if the tokens don't follow the OS (setting.theme.system) */
const getSystemTheme = (): ThemeMode => {
	const { alternate, default: defaultTheme, system } = settings.theme;
	return system && window.matchMedia(`(prefers-color-scheme: ${alternate})`).matches ? alternate : defaultTheme;
};

/* Apply a saved theme as early as possible (the generated :root[data-theme] styles take it from here) */
const storedTheme = getStoredTheme();
if (storedTheme) document.documentElement.setAttribute('data-theme', storedTheme);

export const ThemeToggle = () => {
	const [theme, setTheme] = useState<ThemeMode>(() => storedTheme ?? getSystemTheme());
	const toggleId = 'theme-toggle-choice';

	// Flip the theme, save it, and apply it immediately
	const toggleTheme = () => {
		const next: ThemeMode = theme === 'dark' ? 'light' : 'dark';
		setTheme(next);
		setStoredTheme(next);
		document.documentElement.setAttribute('data-theme', next);
	};

	// Note: the label stays "Dark mode", since the switch's checked state tells screen readers whether it's on, and CSS shows the sun or moon icon from :checked
	return (
		<label className="theme-toggle pointer" htmlFor={toggleId}>
			<span className="theme-toggle-label sr-only">Dark mode</span>
			<input id={toggleId} className="theme-toggle-choice sr-only" checked={theme === 'dark'} onChange={toggleTheme} role="switch" type="checkbox" name="theme-toggle" />
			<Icon name={'sun'} size={'2xl'} />
			<Icon name={'moon'} size={'2xl'} />
		</label>
	);
};
