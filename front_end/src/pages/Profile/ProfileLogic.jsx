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

	async function getProfile() {
		const result = await axios.get("http://localhost:3001/profile/" + id, {
			headers: {
				token: token,
			},
		});
		if (isMounted.current && result.data) {
			result.data.profile.interests = result.data.interests;
			setProfile(result.data.profile);
			setLoading(false);
		}
	}

	return { isMounted, loading, getProfile, profile, setProfile };
};
