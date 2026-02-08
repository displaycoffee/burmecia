/* React */
import { Fragment, useContext, useEffect } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

/* Local styles */
import './styles/navigation.scss';

/* Local scripts */
import { NavigationListItemProps, NavigationRoutesProps } from './scripts/navigation-types';
import { navigationUtils } from './scripts/navigation-utils';
import { navigationRoutes } from './scripts/navigation-routes';

/* Local components */
import { Context } from '../../context/Context';

/* Get navigation menu */
const navigationList = navigationUtils.get.list();

export const Navigation = () => {
	const { pathname } = useLocation();
	const context = useContext(Context);
	const utils = context.utils;
	const windowPath = window.location.pathname;

	// Scroll to top when navigation link is clicked on
	useEffect(() => {
		utils.scrollTo();
	}, [pathname]);

	return navigationList && navigationList.length != 0 ? (
		<nav className="navigation">
			<ul className="navigation-list unstyled">
				{navigationList.map((nav) => {
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
						<Fragment key={nav.id}>
							{nav?.children && nav.children.length !== 0 ? (
								<NavigationListItem isActive={isActive} nav={nav}>
									<ul className="navigation-list navigation-list--submenu unstyled">
										{nav.children.map((child) => {
											return <NavigationListItem isActive={false} nav={child} parent={nav.url} key={child.id} />;
										})}
									</ul>
								</NavigationListItem>
							) : (
								<NavigationListItem isActive={isActive} nav={nav} />
							)}
						</Fragment>
					);
				})}
			</ul>
		</nav>
	) : null;
};

export const NavigationListItem = (props: NavigationListItemProps) => {
	const { children, isActive, nav } = props;

	return (
		<li className={`navigation-list-item${isActive ? ' active' : ''}`}>
			<Link to={nav.url} title={nav.alt || nav.label}>
				{nav.label}
			</Link>

			{children ? children : null}
		</li>
	);
};

export const NavigationRoutes = () => {
	return navigationRoutes && navigationRoutes.length != 0 ? (
		<Routes>
			{navigationRoutes.map((nav: NavigationRoutesProps) => {
				return (
					<Fragment key={nav.id}>
						{nav?.children && nav.children.length !== 0 ? (
							<>
								<Route path={`${nav.path}/*`} element={<nav.element />} />

								{nav.children.map((child: NavigationRoutesProps) => {
									return <Route path={child.path} element={<child.element />} key={child.id} />;
								})}
							</>
						) : (
							<Route path={nav.path} element={<nav.element />} />
						)}
					</Fragment>
				);
			})}

			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	) : null;
};
