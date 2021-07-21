// Packages

// Components
import { Loading } from "../../components/Loading/Loading";
import { UserTop } from "./UserTop";
import { UserInfo } from "./UserInfo";
import { UserGroups } from "./UserGroups";

// Logic
import { UserLogic } from "./UserLogic";

// Context

// Styles
import "../Pages.css";
import "./User.css";
import { useEffect } from "react";

// Assets

export const User = (props) => {
	const { loading, getUser, user } = UserLogic();

	useEffect(() => {
		getUser(props.match.params.username);
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return (
			<div className='page'>
				<Loading />
			</div>
		);
	} else {
		return (
			<div className='page'>
				<UserTop user={user} getUser={getUser} />
				<UserInfo user={user} />
				<UserGroups user={user} />
			</div>
		);
	}
};
