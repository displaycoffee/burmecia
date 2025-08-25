/* React */
import { useEffect, useContext } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';

/* Local styles */
import './styles/navigation.scss';

/* Local scripts */
import { navigation, createNavigationList } from './scripts/navigation';

/* Local components */
import { Context } from '../../context/Context';

export const Navigation = () => {
	const { pathname } = useLocation();
	const context = useContext(Context);
	const utils = context.utils;
	const navigationList = createNavigationList(navigation, false);
	const windowPath = window.location.pathname;

	// Scroll to top when navigation link is clicked on
	useEffect(() => {
		utils.scrollTo();
	}, [pathname]);

	return navigationList && navigationList.length != 0 ? (
		<nav className="navigation">
			<ul className="navigation-list unstyled">
				{navigationList.map((nav: PageType) => {
					const isIndex = nav.url == '/' ? true : false;
					const isIndexWindow = windowPath == '/' ? true : false;

					// Determine active navigation link
					let isActive = isIndex && isIndexWindow ? true : false;
					if (!isIndex && !isIndexWindow) {
						const windowSlash = `${windowPath}/`;
						const navSlash = `${nav.url}/`;
						isActive = windowSlash.includes(navSlash) ? true : false;
					}

					return (
						<li className={`navigation-list-item${isActive ? ' active' : ''}`} key={nav.id}>
							<Link to={nav.url} title={nav.alt || nav.label}>
								{nav.label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	) : null;
};

export const NavigationRoutes = () => {
	const navigationList = createNavigationList(navigation, true);

	return navigationList && navigationList.length != 0 ? (
		<Routes>
			{navigationList.map((nav: PageType) => {
				const path = nav.hasChildren ? `${nav.url}/*` : nav.url;
				const navProps = nav?.props ? nav.props : {};

				return <Route path={path} element={<nav.component {...navProps} />} key={nav.id} />;
			})}

			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	) : null;
};
