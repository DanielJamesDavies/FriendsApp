// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../../context/UserContext";

// Styles

// Assets

export const ChatMessageInfoLogic = () => {
	const { token } = useContext(UserContext);
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(false);
	const [readByProfiles, setReadByProfiles] = useState(false);

	async function getReadByProfiles(readByList, messageInfo, setMessageInfo) {
		setLoading(true);

		const result = await axios.post(
			"http://localhost:3001/profile/get-multiple",
			{
				ids: readByList,
			},
			{
				headers: { token: token },
			}
		);
		console.log(result.data);
		if (!result.data || result.data.error) return "Error";
		if (isMounted) {
			setReadByProfiles(result.data);
			setLoading(false);
		}
	}

	return { isMounted, loading, setLoading, readByProfiles, setReadByProfiles, getReadByProfiles };
};
