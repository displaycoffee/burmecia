/* Styles */
import './styles/header.scss';

/* Packages */
import { Link } from '@tanstack/react-router';

/* Scripts */
import { useAppContext } from '@/context/scripts/context-hooks';

/* Components */
import { ThemeToggle } from '@/components/theme-toggle/ThemeToggle';

export const Header = () => {
	const { variables } = useAppContext();

	return (
		<header className="header">
			<h1 className="header-title">
				<Link className={'no-decoration'} to={'/'}>
					{variables.site.name}
				</Link>
			</h1>

			<ThemeToggle />
		</header>
	);
};
