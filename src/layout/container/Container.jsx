/* React */
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* Local styles */
import './styles/container.scss';

/* Local scripts */
import { useBodyClass, useRespond } from '../../_config/scripts/hooks';

/* Local components */
import { Context } from '../../context/Context';
import { Navigation } from '../../components/navigation/Navigation';
import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';
import { Slideout, SlideoutOverlay } from '../../components/slideout/Slideout';
import { Header } from '../../layout/header/Header';
import { Content } from '../../layout/content/Content';
import { Sidebar } from '../../layout/sidebar/Sidebar';
import { Footer } from '../../layout/footer/Footer';
import { Portal } from '../../targets/portal/Portal';

export const Container = (props) => {
	const { theme, utils } = props;
	const location = useLocation();
	const isDesktop = useRespond(theme.bps.bp02);
	let [sidebar, setSidebar] = useState(true);

	// Set body class using custom hook
	useBodyClass('home');

	// Determine if layout should have sidebar or not
	const excludeSidebar = ['/page-two'];
	useEffect(() => {
		sidebar = excludeSidebar.includes(location.pathname) ? false : true;
		setSidebar(sidebar);
	}, [location.pathname]);

	// Slideout options
	const slideoutOptions = {
		id: 'menu',
		isDesktop: isDesktop,
		label: 'Menu',
		content: <Navigation />,
		closeOnClick: true,
		button: {
			outside: false,
			show: true,
		},
	};

	return (
		<Context.Provider value={props}>
			<div className="container">
				<ErrorBoundary message={<ContainerError />}>
					<SlideoutOverlay options={slideoutOptions} />

					<Header />

					{isDesktop ? <Navigation /> : <Slideout options={slideoutOptions} />}

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra imperdiet nisl sed mattis. Orci varius natoque
						penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris pharetra enim non nunc pharetra condimentum ac nec
						nisi. Nunc ac tortor leo. Vestibulum dui diam, ultricies vel tempor quis, cursus eget arcu. Donec sagittis urna volutpat,
						accumsan odio in, porta ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Interdum et malesuada fames ac ante
						ipsum primis in faucibus. Mauris a vulputate tellus, at varius mi. Donec vitae purus faucibus, feugiat ipsum eget, semper
						diam. Pellentesque pretium vulputate accumsan.
					</p>

					<main className="main">
						<div className="main-layout flex-wrap">
							<Content />

							<Sidebar show={sidebar && isDesktop} />
						</div>
					</main>

					<Footer />

					<button className="pointer unstyled a" onClick={(e) => utils.scrollTo(e, '#index')} type="button">
						Scroll to top
					</button>

					<Portal element={'#portal'}>
						<p>
							This is an example of a portal from index.html. It could also be added inside other components to access details of that
							component.
						</p>
					</Portal>
				</ErrorBoundary>
			</div>
		</Context.Provider>
	);
};

const ContainerError = () => {
	return (
		<p>
			Something went wrong. <Link to={'/'}>Go back.</Link>
		</p>
	);
};
