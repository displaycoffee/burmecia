/* React */
import { Link } from 'react-router-dom';

/* Types */
type ChildPageTwoProps = PageType;

export const ChildPageTwo = (props: ChildPageTwoProps) => {
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
