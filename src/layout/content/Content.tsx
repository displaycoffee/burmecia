/* Local styles */
import './styles/content.scss';

/* Local components */
import { NavigationRoutes } from '../../components/navigation/Navigation';

export const Content = () => {
	return (
		<div className="content">
			<NavigationRoutes />
		</div>
	);
};
