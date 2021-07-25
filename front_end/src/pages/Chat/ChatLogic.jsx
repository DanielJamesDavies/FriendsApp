// Packages
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";

// Styles

// Assets

export const ChatLogic = () => {
	const { token } = useContext(UserContext);
	const { chat, setChat, connectSocket } = useContext(ChatContext);
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(true);
	const [chatInputHeight, setChatInputHeight] = useState("20px");

	useEffect(() => {
		connectSocket(token);
		// eslint-disable-next-line
	}, []);

	async function getChat(chat_id) {
		setLoading(true);
		var result = await axios.get("http://localhost:3001/chat/" + chat_id, {
			headers: { token: token },
		});
		if (result.error || !result.data) return "Error";
		result.data.chat.participants = result.data.participants;
		if (isMounted.current && result.data.chat._id === chat_id) {
			setChat(result.data.chat);
			setLoading(false);
		}
	}

	return { isMounted, loading, setLoading, chat, setChat, getChat, chatInputHeight, setChatInputHeight };
};
