/* React */
import { Link } from 'react-router-dom';

/* Types */
type ChildPageOneProps = PageType;

export const ChildPageOne = (props: ChildPageOneProps) => {
	const { url } = props;

	return (
		<div className="page-child-page-one spacing-reset">
			<p>
				this is <strong>child page one</strong> of page two.
			</p>

			<p>
				<Link to={url}>Go back to page two</Link>
			</p>
		</div>
	);
};
