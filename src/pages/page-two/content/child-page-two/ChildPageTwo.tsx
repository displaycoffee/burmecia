/* React */
import { Link } from 'react-router-dom';

export const ChildPageTwo = (props: PageProps) => {
	const { url } = props;

	return (
		<div className="page-child-page-two spacing-reset">
			<p>
				this is <strong>child page two</strong> of page two.
			</p>

			<p>
				<Link to={url}>Go back to page two</Link>
			</p>
		</div>
	);
};
