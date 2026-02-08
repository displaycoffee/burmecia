/* React */
import { Link } from 'react-router-dom';

/* Get parent path */
const linkTo = window.location.pathname.split('/').slice(0, -1).join('/');

export const ChildPageTwo = (props: ObjectPrimitiveProps) => {
	return (
		<div className="page-child-page-two spacing-reset">
			<p>
				this is <strong>child page two</strong> of page two.
			</p>

			<p>
				<Link to={linkTo}>Go back to page two</Link>
			</p>
		</div>
	);
};
