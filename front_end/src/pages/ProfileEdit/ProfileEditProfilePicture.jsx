// Packages
import { useEffect } from "react";

// Components
import { SaveBtn } from "../../components/SaveBtn/SaveBtn";
import { RevertBtn } from "../../components/RevertBtn/RevertBtn";

// Logic
import { ProfileEditProfilePictureLogic } from "./ProfileEditProfilePictureLogic";

// Context

// Styles
import "../Pages.css";
import "./ProfileEdit.css";
import "./ProfileEditProfilePicture.css";

// Assets

export const ProfileEditProfilePicture = ({ profile, setProfile }) => {
	const {
		isMounted,
		profilePicture,
		profilePictureInputRef,
		profilePictureMessage,
		changeProfilePicture,
		saveProfilePicture,
		revertProfilePicture,
	} = ProfileEditProfilePictureLogic({ profile });

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='profile-edit-form-container profile-edit-profile-picture-container'>
			<div className='profile-edit-form-title'>
				<h2 className='profile-edit-form-title-h2-with-btns'>Edit Profile Picture</h2>
				<SaveBtn isSaved={profilePicture === profile.profilePicture} onClick={() => saveProfilePicture(setProfile)} />
				<RevertBtn isSaved={profilePicture === profile.profilePicture} onClick={revertProfilePicture} />
			</div>

			<div className='profile-edit-form-profile-picture-container' onClick={() => profilePictureInputRef.current.click()}>
				{profilePicture ? (
					<img className='profile-edit-form-profile-picture' src={profilePicture} alt='' />
				) : (
					<div className='profile-edit-form-profile-picture' />
				)}
				<div className='profile-edit-form-profile-picture-filter' />
				<input style={{ display: "none" }} ref={profilePictureInputRef} type='file' onChange={changeProfilePicture} />
			</div>
			{profilePictureMessage ? <p className='profile-edit-form-profile-picture-message'>{profilePictureMessage}</p> : null}
		</div>
	);
};
