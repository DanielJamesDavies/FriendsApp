// Packages
import { useContext, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const ProfileLogic = () => {
	const { id, token } = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(false);

	async function getProfile() {
		const userData = await axios.get("http://localhost:3001/profile/" + id, {
			headers: {
				token: token,
			},
		});
		setUser(userData.data);
		setLoading(false);
	}

	return { loading, getProfile, user };
};
