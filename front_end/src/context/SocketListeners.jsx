// Packages
import { useContext, useEffect } from "react";

// Components

// Logic

// Context
import { UserContext } from "./UserContext";
import { ChatContext } from "./ChatContext";

// Styles

// Assets

export const SocketListeners = () => {
	const { id } = useContext(UserContext);
	const { chats, setChats, chat, setChat, socket } = useContext(ChatContext);

	useEffect(() => {
		if (socket) {
			socket.removeAllListeners();

			socket.on("receive-chat-update", (chat) => {
				if (chats) {
					var newChats = JSON.parse(JSON.stringify(chats));
					newChats[newChats.findIndex((e) => e._id === chat._id)] = chat;
					setChats(newChats);
				}
			});

			socket.on("receive-sent-message", (message) => {
				var newChat = JSON.parse(JSON.stringify(chat));
				if (newChat.messages) {
					newChat.messages.push(message);
					setChat(newChat);
				}
			});

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
					if (messageIndex !== -1) {
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
		}
		// eslint-disable-next-line
	}, [socket, chat, chats]);

	return {};
};
