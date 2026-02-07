/* Local components */
import { Home } from '../../../pages/home/Home';
import { PageOne } from '../../../pages/page-one/PageOne';
import { PageTwo } from '../../../pages/page-two/PageTwo';
import { ChildPageOne } from '../../../pages/page-two/content/child-page-one/ChildPageOne';
import { ChildPageTwo } from '../../../pages/page-two/content/child-page-two/ChildPageTwo';

export const navigation = [
	{
		id: 0,
		alt: 'Home',
		component: Home,
		isRoute: true,
		label: 'Home',
		showInNav: true,
		url: '/',
	},
	{
		id: 1,
		alt: 'Page One',
		component: PageOne,
		isRoute: true,
		label: 'Page One',
		showInNav: true,
		url: '/page-one',
	},
	{
		id: 2,
		alt: 'Page Two',
		component: PageTwo,
		isRoute: true,
		label: 'Page Two',
		showInNav: true,
		url: '/page-two',
		children: [
			{
				id: 1,
				alt: 'Child Page One',
				component: ChildPageOne,
				isRoute: true,
				label: 'Child Page One',
				showInNav: true,
				url: '/child-page-one',
			},
			{
				id: 2,
				alt: 'Child Page Two',
				component: ChildPageTwo,
				isRoute: true,
				label: 'Child Page Two',
				url: '/child-page-two',
				showInNav: true,
			},
		],
	},
];

/* Function to sort navigation list */
const sortNavigationList = (list: PageType[]) => {
	return list.sort((a, b) => {
		return a.id - b.id;
	});
};

/* Function to filter out navigation links */
export const createNavigationList = (isRoute: boolean) => {
	// Check if navigation link is value
	const checkNavigationLink = (link: PageType) => {
		return (isRoute && link.isRoute) || (!isRoute && link.showInNav) ? true : false;
	};

	// Create navigation clone
	let navigationClone = [] as PageType[];

	navigation.forEach((nav) => {
		// Create child array navigation
		const navChildren = [] as PageType[];

		// Check if children are available
		if (nav?.children && nav.children.length !== 0) {
			nav.children.forEach((child) => {
				if (checkNavigationLink(child as PageType)) {
					child.url = child.isRoute && !child.url.includes(nav.url) ? `${nav.url}${child.url}` : child.url;
					navChildren.push(child as PageType);
				}
			});
		}

		// If parent navigation is value, push object
		if (checkNavigationLink(nav as PageType)) {
			navigationClone.push({
				...nav,
				children: sortNavigationList(navChildren),
			} as PageType);
		}
	});

	// Return final navigation
	return navigationClone && navigationClone.length !== 0 ? sortNavigationList(navigationClone) : [];
};
