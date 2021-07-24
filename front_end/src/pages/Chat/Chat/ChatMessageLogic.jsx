// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../../context/UserContext";

// Styles

// Assets

export const ChatMessageLogic = () => {
	const { token, id } = useContext(UserContext);
	const isMounted = useRef(false);
	const [reading, setReading] = useState(false);
	const [editMessageId, setEditMessageId] = useState(false);
	const [editMessageText, setEditMessageText] = useState([""]);
	const [editMessageHeight, setEditMessageHeight] = useState("20px");
	const [editMessageWidth, setEditMessageWidth] = useState("20px");

	async function readMessage(message, chat_id) {
		setReading(true);
		await axios.post(
			"http://localhost:3001/message/read/" + chat_id + "/" + message._id,
			{
				user_id: id,
			},
			{
				headers: { token: token },
			}
		);
		if (isMounted) setReading(false);
	}

	function selectMessageToEdit(message) {
		setEditMessageId(message._id);
		setEditMessageText(message.text);
		setTimeout(() => setEditMessageHeight(document.getElementById("chat-message-edit-text-hidden").offsetHeight + "px"), 5);
		setTimeout(() => setEditMessageWidth(document.getElementById("chat-message-edit-textarea").offsetWidth + "px"), 1);
	}

	async function deleteMessage(message, chat_id, setChat, setLoading) {
		setLoading(true);
		const result = await axios.post(
			"http://localhost:3001/message/delete/" + chat_id + "/" + message._id,
			{
				user_id: id,
			},
			{
				headers: { token: token },
			}
		);
		if (!result.data || result.data.error) return "Error";
		result.data.chat.participants = result.data.participants;
		if (result.data.message && isMounted) {
			setEditMessageId(false);
			setEditMessageText("");
			setChat(result.data.chat);
		}
		if (isMounted) setLoading(false);
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
		if (result.data.message && isMounted) {
			setEditMessageId(false);
			setEditMessageText("");
			setChat(result.data.chat);
		}
		if (isMounted) setLoading(false);
	}

	function revertMessageText() {
		setEditMessageId(false);
		setEditMessageText("");
	}

	return {
		isMounted,
		reading,
		editMessageId,
		editMessageHeight,
		editMessageWidth,
		readMessage,
		selectMessageToEdit,
		deleteMessage,
		editMessageText,
		changeMessageText,
		saveEditedMessage,
		revertMessageText,
	};
};
