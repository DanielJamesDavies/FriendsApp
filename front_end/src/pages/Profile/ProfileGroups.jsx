// Packages

// Components
import { GroupItem } from "../../components/GroupItem/GroupItem";

// Logic

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
				{groups.map((group, index) => (
					<GroupItem group={group} key={index} />
				))}
			</div>
		</div>
	);
};
