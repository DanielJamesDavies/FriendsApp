// Packages
import { useEffect } from "react";

// Components
import { Input } from "../../components/Input/Input";
import { SaveBtn } from "../../components/SaveBtn/SaveBtn";
import { RevertBtn } from "../../components/RevertBtn/RevertBtn";

// Logic
import { ProfileEditNamesLogic } from "./ProfileEditNamesLogic";

// Context

// Styles
import "../Pages.css";
import "./ProfileEdit.css";
import "./ProfileEditNames.css";

// Assets

export const ProfileEditNames = ({ profile, setProfile }) => {
	const {
		isMounted,
		nickname,
		setNickname,
		username,
		changeUsername,
		saveNickname,
		revertNickname,
		saveUsername,
		revertUsername,
		usernameAvailableMessage,
	} = ProfileEditNamesLogic({ profile });

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='profile-edit-form-container profile-edit-names-container'>
			<div className='profile-edit-form-title'>
				<h2>Edit Names</h2>
			</div>

			<div className='profile-edit-form-input-container'>
				<Input id='nickname-input' label='Nickname' value={nickname} onChange={(e) => setNickname(e.target.value)} autocomplete='off' />
				<SaveBtn isSaved={nickname === profile.nickname} onClick={() => saveNickname(setProfile)} />
				<RevertBtn isSaved={nickname === profile.nickname} onClick={revertNickname} />
			</div>

			<div className='profile-edit-form-input-container'>
				<Input id='username-input' label='Username' value={username} onChange={(e) => changeUsername(e.target.value)} autocomplete='off' />
				<SaveBtn isSaved={username === profile.username} onClick={() => saveUsername(setProfile)} />
				<RevertBtn isSaved={username === profile.username} onClick={revertUsername} />
				<p
					className={
						usernameAvailableMessage !== "Username not available"
							? "username-available-message"
							: "username-available-message username-not-available-message"
					}
				>
					{usernameAvailableMessage}
				</p>
			</div>
		</div>
	);
};
