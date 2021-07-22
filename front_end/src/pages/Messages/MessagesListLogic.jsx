// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const MessagesListLogic = () => {
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [chatsList, setChatsList] = useState(false);
	const [filteredChatsList, setFilteredChatsList] = useState(false);
	const { token, id } = useContext(UserContext);

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
		setFilteredChatsList(
			chatsList.filter(
				(user) =>
					user.nickname.toLowerCase().includes(e.target.value.toLowerCase()) ||
					user.username.toLowerCase().includes(e.target.value.toLowerCase())
			)
		);
	}

	return { isMounted, loading, searchValue, changeSearchValue, filteredChatsList, getChats };
};
