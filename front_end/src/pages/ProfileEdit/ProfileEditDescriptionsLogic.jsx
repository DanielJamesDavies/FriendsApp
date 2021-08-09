// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const ProfileEditDescriptionsLogic = ({ profile }) => {
	const { id, token } = useContext(UserContext);
	const isMounted = useRef(false);
	const [briefDescription, setBriefDescription] = useState(profile.briefDescription);
	const [fullDescription, setFullDescription] = useState(profile.fullDescription);

	function changeBriefDescription(e) {
		if (e.target.value.length <= 32) setBriefDescription(e.target.value);
	}

	async function saveBriefDescription(setProfile) {
		if (briefDescription.split(" ").join("") === "") return false;
		var result = await axios.post("http://localhost:3001/profile/" + id, { briefDescription: briefDescription }, { headers: { token: token } });
		if (result.data && result.data.profile) {
			setProfile(result.data.profile);
		}
	}

	function revertBriefDescription() {
		setBriefDescription(profile.briefDescription);
	}

	async function saveFullDescription(setProfile) {
		if (Array.isArray(fullDescription) && fullDescription.join("").split(" ").join("") === "") return false;
		if (!Array.isArray(fullDescription) && fullDescription.split(" ").join("") === "") return false;
		var result = await axios.post("http://localhost:3001/profile/" + id, { fullDescription: fullDescription }, { headers: { token: token } });
		if (result.data && result.data.profile) {
			setProfile(result.data.profile);
		}
	}

	function revertFullDescription() {
		setFullDescription(profile.fullDescription);
	}

	return {
		isMounted,
		briefDescription,
		changeBriefDescription,
		saveBriefDescription,
		revertBriefDescription,
		fullDescription,
		setFullDescription,
		saveFullDescription,
		revertFullDescription,
	};
};
