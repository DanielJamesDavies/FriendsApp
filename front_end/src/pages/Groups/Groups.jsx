// Packages

// Components
import { Loading } from "../../components/Loading/Loading";
import { GroupItem } from "../../components/GroupItem/GroupItem";

// Logic
import { GroupsLogic } from "./GroupsLogic";

// Context

// Styles
import "../Pages.css";
import "./Groups.css";

// Assets

export const Groups = () => {
	const { groups } = GroupsLogic();

	return (
		<div className='page groups-page'>
			<div className='page-title'>
				<h1>Groups</h1>
			</div>

			<div className='groups-container'>
				{groups === undefined ? <Loading /> : groups.map((group, index) => <GroupItem key={index} group={group} />)}
			</div>
		</div>
	);
};
