// Packages
import { useContext, useState, useEffect } from "react";

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
	var [joinedChats, setJoinedChats] = useState([]);

	useEffect(() => {
		if (socket) {
			socket.removeAllListeners();

			var newChats = JSON.parse(JSON.stringify(chats));
			var newChat = JSON.parse(JSON.stringify(chat));

			if (newChats) {
				var chat_ids = newChats.map((chat) => {
					return chat._id;
				});

				if (joinedChats.filter((id) => !chat_ids.includes(id)).concat(chat_ids.filter((id) => !joinedChats.includes(id))).length !== 0) {
					socket.emit("join-chats", { user_id: id, chat_ids: chat_ids });
					setJoinedChats(chat_ids);
				}
			}

			socket.on("receive-chat-update", (chat) => {
				if (chats) {
					newChats[newChats.findIndex((e) => e._id === chat._id)] = chat;
					setChats(newChats);
				}
			});

			socket.on("receive-sent-message", ({ message, chat_id }) => {
				if (newChat.messages && newChat._id === chat_id) {
					newChat.messages.push(message);
					setChat(newChat);
				}
			});

			socket.on("receive-edited-message", ({ message, chat_id }) => {
				if (newChat.messages && newChat._id === chat_id) {
					var messageIndex = newChat.messages.findIndex((e) => e._id === message._id);
					if (messageIndex) {
						newChat.messages[messageIndex] = message;
						setChat(newChat);
					}
				}
			});

			socket.on("receive-deleted-message", ({ message, chat_id }) => {
				if (newChat.messages && newChat._id === chat_id) {
					var messageIndex = newChat.messages.findIndex((e) => e._id === message._id);
					if (messageIndex !== -1) {
						newChat.messages.splice(messageIndex, 1);
						setChat(newChat);
					}
				}
			});

			socket.on("receive-read-message", ({ message, chat_id }) => {
				if (message.user_id === id && newChat._id === chat_id) {
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
