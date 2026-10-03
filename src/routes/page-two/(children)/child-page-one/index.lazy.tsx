/* Packages */
import { createLazyFileRoute, Link } from '@tanstack/react-router';

/* Scripts */
import { useAppContext } from '../../../../context/scripts/context-hooks';

/* Components */
import { PageTitle } from '../../../../components/page-title/PageTitle';

/* Page title */
const title = 'Child Page One';

export const Route = createLazyFileRoute('/page-two/(children)/child-page-one/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { utilsBrowser } = useAppContext();

	return (
		<div className="page-child-page-one margin-trim">
			<PageTitle title={title} />

			<h2>{title}</h2>

			<p>
				This is <strong>child page one</strong> of page two.
			</p>

			<p>
				<Link to={utilsBrowser.getPage()}>Go back to page two</Link>
			</p>
		</div>
	);
}
