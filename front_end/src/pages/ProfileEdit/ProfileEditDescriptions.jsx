// Packages
import { useEffect } from "react";

// Components
import { Input } from "../../components/Input/Input";
import { TextArea } from "../../components/TextArea/TextArea";
import { SaveBtn } from "../../components/SaveBtn/SaveBtn";
import { RevertBtn } from "../../components/RevertBtn/RevertBtn";

// Logic
import { ProfileEditDescriptionsLogic } from "./ProfileEditDescriptionsLogic";

// Context

// Styles
import "../Pages.css";
import "./ProfileEdit.css";
import "./ProfileEditDescriptions.css";

// Assets

export const ProfileEditDescriptions = ({ profile, setProfile }) => {
	const {
		isMounted,
		briefDescription,
		changeBriefDescription,
		saveBriefDescription,
		revertBriefDescription,
		fullDescription,
		setFullDescription,
		saveFullDescription,
		revertFullDescription,
	} = ProfileEditDescriptionsLogic({ profile });

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='profile-edit-form-container profile-edit-descriptions-container'>
			<div className='profile-edit-form-title'>
				<h2>Edit Descriptions</h2>
			</div>

			<div className='profile-edit-form-input-container'>
				<div className='profile-edit-form-input-title'>
					<h3>Brief Description</h3>
					<SaveBtn isSaved={briefDescription === profile.briefDescription} onClick={() => saveBriefDescription(setProfile)} />
					<RevertBtn isSaved={briefDescription === profile.briefDescription} onClick={revertBriefDescription} />
				</div>
				<Input
					id='brief-description-input'
					value={briefDescription}
					onChange={changeBriefDescription}
					label={"Brief Description"}
					autocomplete='off'
				/>
			</div>

			<div className='profile-edit-form-input-container'>
				<div className='profile-edit-form-input-title'>
					<h3>Full Description</h3>
					<SaveBtn isSaved={fullDescription === profile.fullDescription} onClick={() => saveFullDescription(setProfile)} />
					<RevertBtn isSaved={fullDescription === profile.fullDescription} onClick={revertFullDescription} />
				</div>
				<TextArea
					value={fullDescription.join("\n")}
					onChange={(e) => setFullDescription(e.target.value.split("\n"))}
					label={"Full Description"}
					id={"input-fullDescription"}
				/>
			</div>
		</div>
	);
};
