// Packages
import { useEffect } from "react";

// Components
import { Loading } from "../../components/Loading/Loading";
import { ProfileTop } from "./ProfileTop";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileGroups } from "./ProfileGroups";

// Logic
import { ProfileLogic } from "./ProfileLogic";

// Context

// Styles
import "../Pages.css";
import "./Profile.css";

// Assets

export const Profile = (props) => {
	const { loading, getProfile, user } = ProfileLogic();

	useEffect(() => {
		getProfile();
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
				<div className='profile-page'>
					<ProfileTop user={user} />
					<ProfileInfo user={user} />
					<ProfileGroups user={user} />
				</div>
			</div>
		);
	}
};
