/* Styles */
import './styles/header.scss';

/* Packages */
import { useState } from 'react';
import { Link } from 'react-router-dom';

/* Components */
import { Button } from '../../components/forms/Forms';

/* Read the resolved theme on first render: an explicit stored override wins, otherwise fall back to
   whatever the OS/browser preference currently resolves to */
const getInitialTheme = () => {
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const Header = () => {
	const [theme, setTheme] = useState(getInitialTheme);

	// Flip the explicit theme override, persist it, and apply it immediately
	const toggleTheme = () => {
		const next = theme === 'dark' ? 'light' : 'dark';
		setTheme(next);
		localStorage.setItem('theme', next);
		document.documentElement.setAttribute('data-theme', next);
	};

	return (
		<header className="header">
			<h1>
				<Link to="/">Burmecia</Link>
			</h1>

			<Button label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} variant="unstyled" onClick={toggleTheme} />
		</header>
	);
};
