// Packages

// Components
import { GroupItem } from "../../components/GroupItem/GroupItem";

// Logic
import { UserGroupsLogic } from "./UserGroupsLogic";

// Context

// Styles
import "../Pages.css";
import "./UserGroups.css";

// Assets
import groups from "./groups.json";

export const UserGroups = ({ user }) => {
	return (
		<div className='user-groups'>
			<div className='user-groups-container'>
				<GroupItem group={groups[0]} />
			</div>
		</div>
	);
};
