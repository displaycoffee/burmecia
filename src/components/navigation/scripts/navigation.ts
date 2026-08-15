/* Packages */
import { lazy } from 'react';

/* Scripts */
import { NavigationType } from './navigation-types';

/* Components */
const Home = lazy(() => import('../../../pages/home/Home').then((m) => ({ default: m.Home })));
const PageOne = lazy(() => import('../../../pages/page-one/PageOne').then((m) => ({ default: m.PageOne })));
const PageTwo = lazy(() => import('../../../pages/page-two/PageTwo').then((m) => ({ default: m.PageTwo })));
const PageThree = lazy(() => import('../../../pages/page-three/PageThree').then((m) => ({ default: m.PageThree })));
const PageFour = lazy(() => import('../../../pages/page-four/PageFour').then((m) => ({ default: m.PageFour })));

export const navigation: NavigationType[] = [
	{
		id: 0,
		element: Home,
		isRoute: true,
		label: 'Home',
		showInNav: true,
		url: '/',
	},
	{
		id: 1,
		element: PageOne,
		isRoute: true,
		label: 'Page One',
		showInNav: true,
		url: '/page-one',
	},
	{
		id: 2,
		element: PageTwo,
		isRoute: true,
		label: 'Page Two',
		showInNav: true,
		url: '/page-two',
		children: [
			{
				id: 1,
				element: PageTwo,
				isRoute: true,
				label: 'Child Page One',
				showInNav: true,
				url: '/child-page-one',
			},
			{
				id: 2,
				element: PageTwo,
				isRoute: true,
				label: 'Child Page Two',
				url: '/child-page-two',
				showInNav: true,
			},
		],
	},
	{
		id: 3,
		element: PageThree,
		isRoute: true,
		label: 'Page Three',
		showInNav: true,
		url: '/page-three',
	},
	{
		id: 4,
		element: PageFour,
		isRoute: true,
		label: 'Page Four',
		showInNav: true,
		url: '/page-four',
	},
];
