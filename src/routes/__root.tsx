/* Packages */
import { createRootRoute } from '@tanstack/react-router';

/* Components */
import { ContextProvider } from '../context/Context';
import { Container } from '../layout/container/Container';

export const Route = createRootRoute({
	component: () => (
		<ContextProvider>
			<Container />
		</ContextProvider>
	),
});
