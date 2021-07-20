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
				{groups.map((group, index) => (
					<GroupItem group={group} key={index} />
				))}
			</div>
		</div>
	);
};
