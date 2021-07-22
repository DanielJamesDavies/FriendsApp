// Packages
import { useContext, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const ChatInputLogic = () => {
	const { token, id } = useContext(UserContext);
	const [text, setText] = useState("");

	async function sendMessage(chat_id, setChat, setLoading) {
		setLoading(true);
		const result = await axios.post(
			"http://localhost:3001/chat/message/" + chat_id,
			{
				user_id: id,
				text: text,
			},
			{
				headers: { token: token },
			}
		);
		result.data.chat.participants = result.data.participants;
		if (result.data.message) {
			setText("");
			setChat(result.data.chat);
		}
		setLoading(false);
	}

	return { text, setText, sendMessage };
};
