// Packages
import { useRef, useContext, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const InterestsLogic = () => {
	const isMounted = useRef(false);
	const { token } = useContext(UserContext);
	const [interest, setInterest] = useState(false);

	async function getInterest(interest_id) {
		var result = await axios.get("http://localhost:3001/interest/" + interest_id, {
			headers: {
				token: token,
			},
		});
		if (isMounted.current && result.data) setInterest(result.data);
	}

	return { isMounted, interest, setInterest, getInterest };
};
