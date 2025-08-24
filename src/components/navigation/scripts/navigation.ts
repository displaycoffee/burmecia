/* Local components */
import { Home } from '../../../pages/home/Home';
import { PageOne } from '../../../pages/page-one/PageOne';
import { PageTwo } from '../../../pages/page-two/PageTwo';

export const navigation = [
	{
		id: 2,
		label: 'Page Two',
		alt: 'Page Two',
		url: '/page-two',
		showInNav: true,
		isRoute: true,
		hasChildren: true,
		component: PageTwo,
		props: {
			url: '/page-two',
		},
	},
	{
		id: 1,
		label: 'Page One',
		alt: 'Page One',
		url: '/page-one',
		showInNav: true,
		isRoute: true,
		hasChildren: false,
		component: PageOne,
	},
	{
		id: 0,
		label: 'Home',
		alt: 'Home',
		url: '/',
		showInNav: true,
		isRoute: true,
		hasChildren: false,
		component: Home,
	},
].sort((a, b) => {
	// Sort navigation by id
	return a.id - b.id;
});

/* Function to filter out navigation links */
export const createNavigationList = (navigation: Page[], isRoute: boolean) => {
	// Determine initial navigaton check
	let hasNavigation = navigation && navigation.length !== 0 ? true : false;

	// Filter out navigation links
	navigation = navigation.filter((nav) => {
		const hasNavLink = (isRoute && nav.isRoute) || (!isRoute && nav.showInNav) ? true : false;
		return hasNavLink;
	});

	// Check navigation again
	hasNavigation = navigation && navigation.length !== 0 ? true : false;

	// Return final navigation
	return hasNavigation ? navigation : [];
};
