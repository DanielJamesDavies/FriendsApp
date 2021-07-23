// Packages
import { useContext, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const ChatMessagesLogic = () => {
	const { token, id } = useContext(UserContext);
	const [editMessageId, setEditMessageId] = useState(false);
	const [editMessageText, setEditMessageText] = useState([""]);
	const [editMessageHeight, setEditMessageHeight] = useState("20px");
	const [editMessageWidth, setEditMessageWidth] = useState("0px");

	function selectMessageToEdit(message) {
		setEditMessageId(message._id);
		setEditMessageText(message.text);
		setTimeout(() => setEditMessageHeight(document.getElementById("chat-message-edit-text-hidden").offsetHeight + "px"), 5);
		setTimeout(() => setEditMessageWidth(document.getElementById("chat-message-edit-textarea").offsetWidth + "px"), 1);
	}

	function changeMessageText(e) {
		setEditMessageText(e.target.value.split("\n"));
		setTimeout(() => setEditMessageHeight(document.getElementById("chat-message-edit-text-hidden").offsetHeight + "px"), 5);
		setTimeout(() => setEditMessageWidth(document.getElementById("chat-message-edit-textarea").offsetWidth + "px"), 1);
	}

	async function saveEditedMessage(chat_id, setChat, setLoading) {
		setLoading(true);
		const result = await axios.post(
			"http://localhost:3001/message/edit/" + chat_id + "/" + editMessageId,
			{
				user_id: id,
				text: editMessageText,
			},
			{
				headers: { token: token },
			}
		);
		if (!result.data || result.data.error) return "Error";
		result.data.chat.participants = result.data.participants;
		if (result.data.message) {
			setEditMessageId(false);
			setEditMessageText("");
			setChat(result.data.chat);
		}
		setLoading(false);
	}

	function revertMessageText() {
		setEditMessageId(false);
		setEditMessageText("");
	}

	return {
		editMessageId,
		editMessageHeight,
		editMessageWidth,
		selectMessageToEdit,
		editMessageText,
		changeMessageText,
		saveEditedMessage,
		revertMessageText,
	};
};
