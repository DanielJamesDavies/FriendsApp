// Packages
import { useRef, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const ChatItemLogic = () => {
	const history = useHistory();
	const isMounted = useRef(false);
	const { token } = useContext(UserContext);
	const [lastMessageNickname, setLastMessageNickname] = useState(false);

	function toChat(chat_id) {
		history.push("/chat/" + chat_id + "/");
	}

	async function getLastMessageNickname(user_id) {
		const profile = await axios.get("http://localhost:3001/profile/" + user_id, {
			headers: { token: token },
		});
		if (isMounted.current) setLastMessageNickname(profile.data.nickname);
	}

	return { isMounted, toChat, lastMessageNickname, getLastMessageNickname };
};
