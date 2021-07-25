// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../../context/UserContext";
import { ChatContext } from "../../../context/ChatContext";

// Styles

// Assets

export const ChatInputLogic = () => {
	const { token, id } = useContext(UserContext);
	const { socket } = useContext(ChatContext);
	const isMounted = useRef(false);
	const [text, setText] = useState([""]);
	const [sending, setSending] = useState(false);

	function changeText(e, setChatInputHeight) {
		if (isMounted) {
			setText(e.target.value.split("\n"));
			setTimeout(() => setChatInputHeight(document.getElementById("chat-input-text").offsetHeight + "px"), 1);
		}
	}

	async function sendMessage(chat_id, setLoading) {
		if (isMounted) setSending(false);
		if (text.join("\n").split(" ").join("") === "") return;

		if (isMounted) setLoading(true);
		const result = await axios.post(
			"http://localhost:3001/message/" + chat_id,
			{
				user_id: id,
				text: text,
			},
			{
				headers: { token: token },
			}
		);
		if (!result.data || result.data.error) return "Error";
		if (result.data.message) {
			setText([""]);
			socket.emit("send-message", { message: result.data.message, chat_id: chat_id });
		}
		if (isMounted) setLoading(false);
	}

	return { isMounted, text, changeText, sendMessage, sending, setSending };
};
