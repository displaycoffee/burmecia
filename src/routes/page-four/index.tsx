/* Packages */
import { createFileRoute } from '@tanstack/react-router';

/* Components */
import { PageFour } from '../../pages/page-four/PageFour';

export const Route = createFileRoute('/page-four/')({
	component: PageFour,
});
