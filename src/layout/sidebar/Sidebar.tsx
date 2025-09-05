/* Local styles */
import './styles/sidebar.scss';

export const Sidebar = (props: SidebarProps) => {
	const show = props.show;

	return show ? (
		<aside className="sidebar">
			<p>this is sidebar content.</p>
		</aside>
	) : null;
};

/* Types */
type SidebarProps = {
	show: boolean;
};
