// Packages
import { useRef } from "react";
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const ChatItemLogic = () => {
	const history = useHistory();
	const isMounted = useRef(false);

	function toChat(chat_id) {
		history.push("/chat/" + chat_id + "/");
	}

	return { isMounted, toChat };
};
