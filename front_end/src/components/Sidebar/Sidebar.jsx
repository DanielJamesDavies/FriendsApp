// Packages
import * as fa from "react-icons/fa";

// Components

// Logic
import { SidebarLogic } from "./SidebarLogic";

// Context

// Styles
import "./Sidebar.css";

// Assets

export const Sidebar = () => {
	const { toPage } = SidebarLogic();

	return (
		<div className='sidebar'>
			<div className='sidebar-buttons'>
				<button className='sidebar-button sidebar-button-user' onClick={() => toPage("/profile/")}>
					<svg height='50' width='50'>
						<circle cx='25' cy='25' r='25' />
					</svg>
				</button>

				<button className='sidebar-button sidebar-button-meet' onClick={() => toPage("/meet/")}>
					<fa.FaHandshake />
				</button>

				<button className='sidebar-button sidebar-button-friends' onClick={() => toPage("/friends/")}>
					<fa.FaUser />
				</button>

				<button className='sidebar-button sidebar-button-groups' onClick={() => toPage("/groups/")}>
					<fa.FaUsers />
				</button>

				<button className='sidebar-button sidebar-button-settings' onClick={() => toPage("/settings/")}>
					<fa.FaCog />
				</button>
			</div>
		</div>
	);
};
