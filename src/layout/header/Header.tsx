/* Styles */
import './styles/header.scss';

/* Packages */
import { Link } from '@tanstack/react-router';

export const Header = () => {
	return (
		<header className="header">
			<h1>
				<Link className={'no-decoration'} to={'/'}>
					Burmecia
				</Link>
			</h1>
		</header>
	);
};
