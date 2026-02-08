/* React */
import { Link } from 'react-router-dom';

/* Get parent path */
const linkTo = window.location.pathname.split('/').slice(0, -1).join('/');

export const ChildPageOne = () => {
	return (
		<div className="page-child-page-one spacing-reset">
			<p>
				this is <strong>child page one</strong> of page two.
			</p>

			<p>
				<Link to={linkTo}>Go back to page two</Link>
			</p>
		</div>
	);
};
