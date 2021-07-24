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
	const { token, id, socket } = useContext(UserContext);
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(true);
	const [chat, setChat] = useState(false);
	const [chatInputHeight, setChatInputHeight] = useState("20px");

	socket.on("receive-sent-message", (message) => {
		var newChat = JSON.parse(JSON.stringify(chat));
		if (newChat.messages) {
			newChat.messages.push(message);
			setChat(newChat);
		}
	});

	socket.on("receive-edited-message", (message) => {
		var newChat = JSON.parse(JSON.stringify(chat));
		if (newChat.messages) {
			var messageIndex = newChat.messages.findIndex((e) => e._id === message._id);
			if (messageIndex) {
				newChat.messages[messageIndex] = message;
				setChat(newChat);
			}
		}
	});

	socket.on("receive-deleted-message", (message) => {
		var newChat = JSON.parse(JSON.stringify(chat));
		if (newChat.messages) {
			var messageIndex = newChat.messages.findIndex((e) => e._id === message._id);
			if (messageIndex) {
				newChat.messages.splice(messageIndex, 1);
				setChat(newChat);
			}
		}
	});

	socket.on("receive-read-message", (message) => {
		if (message.user_id === id) {
			var newChat = JSON.parse(JSON.stringify(chat));
			if (newChat.messages) {
				var messageIndex = newChat.messages.findIndex((e) => e._id === message._id);
				if (messageIndex) {
					newChat.messages[messageIndex] = message;
					setChat(newChat);
				}
			}
		}
	});

	async function getChat(chat_id) {
		setLoading(true);
		var result = await axios.get("http://localhost:3001/chat/" + chat_id, {
			headers: { token: token },
		});
		if (result.error || !result.data) return "Error";
		result.data.chat.participants = result.data.participants;
		if (isMounted.current) {
			setChat(result.data.chat);
			setLoading(false);
		}
	}

	return { isMounted, loading, setLoading, chat, setChat, getChat, chatInputHeight, setChatInputHeight };
};
