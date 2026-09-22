/* Packages */
import { createFileRoute } from '@tanstack/react-router';

/* Components */
import { Home } from '../pages/home/Home';

export const Route = createFileRoute('/')({
	component: Home,
});
