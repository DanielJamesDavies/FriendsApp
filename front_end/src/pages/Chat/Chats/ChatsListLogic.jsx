// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

// Components

// Logic

// Context
import { UserContext } from "../../../context/UserContext";

// Styles

// Assets

export const ChatsListLogic = () => {
	const { token, id } = useContext(UserContext);
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [chatsList, setChatsList] = useState(false);
	const [filteredChatsList, setFilteredChatsList] = useState(false);
	const socket = io.connect("http://localhost:3001/");

	socket.on("receive-chat-update", (chat) => {
		if (chatsList) {
			var newChatsList = JSON.parse(JSON.stringify(chatsList));
			newChatsList[newChatsList.findIndex((e) => e._id === chat._id)] = chat;
			setChatsList(newChatsList);
			setFilteredChatsList(newChatsList.filter((chat) => chat.name.toLowerCase().includes(searchValue.toLowerCase())));
		}
	});

	async function getChats() {
		const chats = await axios.get("http://localhost:3001/chat/messages/" + id, {
			headers: { token: token },
		});
		if (isMounted.current) {
			setChatsList(chats.data);
			setFilteredChatsList(chats.data);
			setLoading(false);
		}
	}

	function changeSearchValue(e) {
		setSearchValue(e.target.value);
		setFilteredChatsList(chatsList.filter((chat) => chat.name.toLowerCase().includes(e.target.value.toLowerCase())));
	}

	return { isMounted, loading, searchValue, changeSearchValue, filteredChatsList, getChats };
};
