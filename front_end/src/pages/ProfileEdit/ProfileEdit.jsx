// Packages
import { useEffect } from "react";

// Components
import { Loading } from "../../components/Loading/Loading";
import { ProfileEditNames } from "./ProfileEditNames";
import { ProfileEditDescriptions } from "./ProfileEditDescriptions";
import { ProfileEditBanner } from "./ProfileEditBanner";

// Logic
import { ProfileEditLogic } from "./ProfileEditLogic";

// Context

// Styles
import "../Pages.css";
import "./ProfileEdit.css";

// Assets

export const ProfileEdit = (props) => {
	const { isMounted, loading, getProfile, profile, setProfile } = ProfileEditLogic();

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
			<div className='page profile-edit-page'>
				<div className='page-title'>
					<h1>Edit Profile</h1>
				</div>

				<div className='profile-edit-forms-container'>
					<ProfileEditNames profile={profile} setProfile={setProfile} />
					<ProfileEditDescriptions profile={profile} setProfile={setProfile} />
					<ProfileEditBanner profile={profile} setProfile={setProfile} />
				</div>
			</div>
		);
	}
};
