// Packages
import { useContext } from "react";
import { FaHandshake, FaUser, FaUsers, FaCog } from "react-icons/fa";

// Components

// Logic
import { SidebarLogic } from "./SidebarLogic";

// Context
import { UserContext } from "../../context/UserContext";

// Styles
import "./Sidebar.css";

// Assets

export const Sidebar = () => {
	const { toPage } = SidebarLogic();
	const { profilePicture } = useContext(UserContext);

	return (
		<div className='sidebar'>
			<div className='sidebar-buttons'>
				<button className='sidebar-button sidebar-button-user' onClick={() => toPage("/profile/")}>
					{profilePicture ? (
						<img className='sidebar-profile-picture' src={profilePicture} />
					) : (
						<svg height='50' width='50'>
							<circle cx='25' cy='25' r='25' />
						</svg>
					)}
				</button>

				<button className='sidebar-button sidebar-button-meet' onClick={() => toPage("/meet/")}>
					<FaHandshake />
				</button>

				<button className='sidebar-button sidebar-button-friends' onClick={() => toPage("/friends/")}>
					<FaUser />
				</button>

				<button className='sidebar-button sidebar-button-groups' onClick={() => toPage("/groups/")}>
					<FaUsers />
				</button>

				<button className='sidebar-button sidebar-button-settings' onClick={() => toPage("/settings/")}>
					<FaCog />
				</button>
			</div>
		</div>
	);
};
