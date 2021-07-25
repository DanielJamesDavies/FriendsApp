import React, { createContext, useState } from "react";
import io from "socket.io-client";

export const ChatContext = createContext();

// eslint-disable-next-line
export default ({ children }) => {
	const [chats, setChats] = useState(false);
	const [chat, setChat] = useState(false);
	const [socket, setSocket] = useState(false);

	function connectSocket(token) {
		if (token) setSocket(io.connect("http://localhost:3001/"));
	}

	return <ChatContext.Provider value={{ chats, setChats, chat, setChat, socket, connectSocket }}>{children}</ChatContext.Provider>;
};
