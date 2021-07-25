// Packages
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../../context/UserContext";
import { ChatContext } from "../../../context/ChatContext";

// Styles

// Assets

export const ChatsListLogic = () => {
	const { token, id } = useContext(UserContext);
	const { chats, setChats } = useContext(ChatContext);
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [filteredChatsList, setFilteredChatsList] = useState(false);

	useEffect(() => {
		if (chats) setFilteredChatsList(chats.filter((chat) => chat.name.toLowerCase().includes(searchValue.toLowerCase())));
		// eslint-disable-next-line
	}, [chats]);

	async function getChats() {
		const chats = await axios.get("http://localhost:3001/chat/messages/" + id, {
			headers: { token: token },
		});
		if (isMounted.current) {
			setChats(chats.data);
			setFilteredChatsList(chats.data);
			setLoading(false);
		}
	}

	function changeSearchValue(e) {
		setSearchValue(e.target.value);
		setFilteredChatsList(chats.filter((chat) => chat.name.toLowerCase().includes(e.target.value.toLowerCase())));
	}

	return { isMounted, loading, searchValue, changeSearchValue, filteredChatsList, getChats };
};
