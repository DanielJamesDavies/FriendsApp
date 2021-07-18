// Packages

// Components
import { GroupItem } from "../../components/GroupItem/GroupItem";

// Logic
import { ProfileGroupsLogic } from "./ProfileGroupsLogic";

// Context

// Styles
import "../Pages.css";
import "./ProfileGroups.css";

// Assets
import groups from "./groups.json";

export const ProfileGroups = ({ user }) => {
	return (
		<div className='profile-groups'>
			<div className='profile-groups-container'>
				<GroupItem group={groups[0]} />
			</div>
		</div>
	);
};
