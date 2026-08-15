/* Styles */
import './styles/page-four.scss';

/* Components */
import { Image } from '../../components/image/Image';

export const PageFour = () => {
	return (
		<div className="page-four margin-trim">
			<h2>Page Four</h2>

			<p>this is the first page.</p>

			<Image alt={'Cat 01'} hasBg={true} hasLazy={true} image={'/assets/images/test/test-image-01.jpg'} wrapperClasses={['bg']} />

			<Image alt={'Cat 02'} hasLazy={true} image={'/assets/images/test/test-image-02.jpg'} wrapperClasses={['fit']} />

			<Image alt={'Cat 03'} hasLazy={true} image={'/assets/images/test/test-image-03.jpg'} wrapperClasses={['fluid']} />
		</div>
	);
};
