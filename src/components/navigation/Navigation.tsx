/* React */
import { Fragment, useContext, useEffect } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

/* Local styles */
import './styles/navigation.scss';

/* Local scripts */
import { NavigationListItemProps } from './scripts/navigation-types';
import { createNavigationList } from './scripts/navigation';

/* Local components */
import { Context } from '../../context/Context';

/* Create navigation lists */
const navigationList = createNavigationList(false) as PageType[];
const navigationListRoutes = createNavigationList(true) as PageType[];

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
						<Fragment key={nav.id}>
							{nav?.children && nav.children.length !== 0 ? (
								<NavigationListItem isActive={isActive} nav={nav}>
									<ul className="navigation-list navigation-list--submenu unstyled">
										{nav.children.map((child: PageType) => {
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
	return navigationListRoutes && navigationListRoutes.length != 0 ? (
		<Routes>
			{navigationListRoutes.map((nav: PageType) => {
				return (
					<Fragment key={nav.id}>
						{nav?.children && nav.children.length !== 0 ? (
							<>
								<Route path={`${nav.url}/*`} element={<nav.component />} />

								{nav.children.map((child: PageType) => {
									return <Route path={child.url} element={<child.component />} key={child.id} />;
								})}
							</>
						) : (
							<Route path={nav.url} element={<nav.component />} />
						)}
					</Fragment>
				);
			})}

			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	) : null;
};
