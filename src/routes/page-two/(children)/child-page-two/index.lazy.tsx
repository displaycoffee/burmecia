/* Packages */
import { createLazyFileRoute, Link } from '@tanstack/react-router';

/* Scripts */
import { navigationHeader } from '../../../../components/navigation/scripts/navigation';
import { navigationUtils } from '../../../../components/navigation/scripts/navigation-utils';

/* Components */
import { PageTitle } from '../../../../components/page-title/PageTitle';

/* Page title */
const title = 'Child Page Two';

/* Parent page, from the same navigation data that Page Two uses to list its children */
const parentPage = navigationUtils.get.listItem(navigationHeader, 'page-two');

export const Route = createLazyFileRoute('/page-two/(children)/child-page-two/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="page-child-page-two margin-trim">
			<PageTitle title={title} />

			<h2>{title}</h2>

			<p>
				This is <strong>child page two</strong> of page two.
			</p>

			{parentPage ? (
				<p>
					<Link to={parentPage.url}>Go back to {parentPage.label.toLowerCase()}</Link>
				</p>
			) : null}
		</div>
	);
}
