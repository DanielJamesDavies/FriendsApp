// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const ChatLogic = () => {
	const { token } = useContext(UserContext);
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(true);
	const [chat, setChat] = useState(true);

	async function getChat(chat_id) {
		setLoading(true);
		var result = await axios.get("http://localhost:3001/chat/" + chat_id, {
			headers: { token: token },
		});
		if (result.error) return "Error";
		result.data.chat.participants = result.data.participants;
		if (isMounted.current) {
			setChat(result.data.chat);
			setLoading(false);
		}
	}

	return { isMounted, loading, setLoading, chat, setChat, getChat };
};
