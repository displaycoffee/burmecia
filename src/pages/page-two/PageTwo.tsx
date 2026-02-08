/* React */
import { Link } from 'react-router-dom';

/* Local styles */
import './styles/page-two.scss';

/* Local scripts */
import { navigationUtils } from '../../components/navigation/scripts/navigation-utils';

/* Get navigation menu */
const navigationList = navigationUtils.get.children(2);

export const PageTwo = () => {
	return (
		<div className="page-two spacing-reset">
			<h4>Child Pages</h4>
			<ul>
				{navigationList.map((nav) => {
					return (
						<li key={nav.url}>
							<Link to={`${nav.url}`}>{nav.label}</Link>
						</li>
					);
				})}
			</ul>

			<p>this is the second page.</p>

			<div className="row row-auto row-spacing-20 row-wrap">
				<div className="column column-width-33">column 01</div>

				<div className="column column-width-33">column 02</div>

				<div className="column column-width-33">column 03</div>
			</div>

			<p>an element below the row example.</p>
		</div>
	);
};
