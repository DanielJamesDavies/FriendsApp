// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const InterestsLogic = () => {
	const { id, token } = useContext(UserContext);
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(false);
	const [interest, setInterest] = useState(false);
	const [userInterests, setUserInterests] = useState(false);

	async function getInterest(interest_id) {
		setLoading(true);
		var result = await axios.get("http://localhost:3001/interest/" + interest_id, {
			headers: {
				token: token,
			},
		});
		if (isMounted.current && result.data) {
			setInterest(result.data);
		}
		if (userInterests) setLoading(false);
	}

	async function getUserInterests(interest_id) {
		setLoading(true);
		var result = await axios.get("http://localhost:3001/interest/profile/" + id, {
			headers: {
				token: token,
			},
		});
		if (isMounted.current && result.data) {
			setUserInterests(result.data);
		}
		if (!interest_id || interest) setLoading(false);
	}

	return { isMounted, loading, interest, setInterest, userInterests, setUserInterests, getInterest, getUserInterests };
};
