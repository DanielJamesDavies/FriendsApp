// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const ProfileLogic = () => {
	const { id, token } = useContext(UserContext);
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState(false);
	const [interests, setInterests] = useState(false);

	async function getProfile() {
		var interestsList = [];

		var profileResult = await axios.get("http://localhost:3001/profile/" + id, { headers: { token: token } });
		if (isMounted.current && profileResult.data && profileResult.data.profile) {
			interestsList = profileResult.data.profile.interests;
			setProfile(profileResult.data.profile);
			setLoading(false);
		}

		var interestsResult = await axios.post(
			"http://localhost:3001/interest/profile-full/",
			{ interests: interestsList },
			{ headers: { token: token } }
		);
		if (isMounted.current && profileResult.data && profileResult.data.profile && interestsResult.data && interestsResult.data.interests) {
			setInterests(interestsResult.data.interests);
		}
	}

	return { isMounted, loading, getProfile, profile, interests };
};
