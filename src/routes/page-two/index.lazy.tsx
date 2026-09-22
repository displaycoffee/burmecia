/* Packages */
import { createLazyFileRoute, Link } from '@tanstack/react-router';

/* Scripts */
import { navigationHeader } from '../../components/navigation/scripts/navigation';
import { navigationUtils } from '../../components/navigation/scripts/navigation-utils';

/* Components */
import { List } from '../../components/blocks/Blocks';

/* Get navigation menu */
const navigationList = navigationUtils.get.listItem(navigationHeader, 'page-two');

export const Route = createLazyFileRoute('/page-two/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="page-two margin-trim">
			<h2>Page Two</h2>

			{navigationList?.children && navigationList.children.length !== 0 ? (
				<>
					<h3>Child Pages</h3>

					<List>
						{navigationList.children.map((nav) => {
							return (
								<li key={nav.url}>
									<Link to={`${nav.url}`}>{nav.label}</Link>
								</li>
							);
						})}
					</List>
				</>
			) : null}

			<p>This is the second page.</p>

			<div className="row row-auto row-spacing-20 row-wrap">
				<div className="column column-width-33">Column 01</div>

				<div className="column column-width-33">Column 02</div>

				<div className="column column-width-33">Column 03</div>
			</div>

			<p>An element below the row example.</p>
		</div>
	);
}
