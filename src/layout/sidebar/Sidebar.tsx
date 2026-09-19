/* Styles */
import './styles/sidebar.scss';

/* Scripts */
import type { SidebarProps } from './scripts/sidebar-types';

export const Sidebar = (props: SidebarProps) => {
	const { show } = props;

	return show ? (
		<aside className="sidebar margin-trim">
			<h3>Sidebar</h3>

			<p>This is sidebar content.</p>
		</aside>
	) : null;
};
