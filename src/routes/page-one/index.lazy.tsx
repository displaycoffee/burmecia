/* Packages */
import { createLazyFileRoute } from '@tanstack/react-router';

/* Components */
import { PageTitle } from '@/components/page-title/PageTitle';
import { Image } from '@/components/image/Image';

/* Page title */
const title = 'Page One';

export const Route = createLazyFileRoute('/page-one/')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="page-one margin-trim">
			<PageTitle title={title} />

			<h2>{title}</h2>

			<p>This is the first page.</p>

			<Image alt={'Cat 01'} hasBg={true} hasLazy={true} image={'/assets/images/test/test-image-01.jpg'} wrapperClasses={['bg']} />

			<Image alt={'Cat 02'} hasLazy={true} image={'/assets/images/test/test-image-02.jpg'} wrapperClasses={['fit']} />

			<Image alt={'Cat 03'} hasLazy={true} image={'/assets/images/test/test-image-03.jpg'} wrapperClasses={['fluid']} />
		</div>
	);
}
