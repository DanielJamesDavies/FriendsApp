// Packages
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const ChatItemLogic = () => {
	const history = useHistory();

	function toChat(chat_id) {
		history.push("/chat/" + chat_id + "/");
	}

	return { toChat };
};
