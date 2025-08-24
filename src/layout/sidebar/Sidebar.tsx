/* Local styles */
import './styles/sidebar.scss';

/* Props for Sidebar */
type SidebarProps = {
	show: boolean;
};

export const Sidebar = (props: SidebarProps) => {
	const show = props.show;

	return show ? (
		<aside className="sidebar">
			<p>this is sidebar content.</p>
		</aside>
	) : null;
};
