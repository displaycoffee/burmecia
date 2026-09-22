/* Packages */
import { createLazyFileRoute, Link } from '@tanstack/react-router';

/* Scripts */
import { useAppContext } from '../../../../context/scripts/context-hooks';

export const Route = createLazyFileRoute('/page-two/(children)/child-page-one/')({
	component: RouteComponent,
});

function RouteComponent() {
	const { utils } = useAppContext();

	return (
		<div className="page-child-page-one margin-trim">
			<h2>Child Page One</h2>

			<p>
				This is <strong>child page one</strong> of page two.
			</p>

			<p>
				<Link to={utils.getPage()}>Go back to page two</Link>
			</p>
		</div>
	);
}
