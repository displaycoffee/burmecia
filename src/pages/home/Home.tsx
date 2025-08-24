/* Local styles */
import './styles/home.scss';

export const Home = () => {
	return (
		<div className="home spacing-reset">
			<p>this is an index page.</p>

			<ul>
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
				<li>Item 4</li>
			</ul>

			<ul className="unstyled">
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
				<li>Item 4</li>
			</ul>

			<ol>
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
				<li>Item 4</li>
			</ol>

			<ol className="unstyled">
				<li>Item 1</li>
				<li>Item 2</li>
				<li>Item 3</li>
				<li>Item 4</li>
			</ol>
		</div>
	);
};
