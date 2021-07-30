// Packages
import { useEffect } from "react";

// Components
import { Loading } from "../../components/Loading/Loading";
import { ProfileTop } from "./ProfileTop";
import { ProfileInfo } from "./ProfileInfo";
import { ProfileInterests } from "./ProfileInterests";
import { ProfileGroups } from "./ProfileGroups";

// Logic
import { ProfileLogic } from "./ProfileLogic";

// Context

// Styles
import "../Pages.css";
import "./Profile.css";

// Assets

export const Profile = (props) => {
	const { isMounted, loading, getProfile, profile, setProfile } = ProfileLogic();

	useEffect(() => {
		isMounted.current = true;
		getProfile();
		return () => {
			isMounted.current = false;
		};
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
				<div className='profile-page'>
					<ProfileTop profile={profile} />
					<ProfileInfo profile={profile} />
					{!profile.interests ? null : <ProfileInterests profile={profile} setProfile={setProfile} />}
					{!profile.groups ? null : <ProfileGroups profile={profile} />}
					<ProfileGroups />
				</div>
			</div>
		);
	}
};
