// Packages
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const GroupItemLogic = () => {
	const history = useHistory();

	function toGroup(id) {
		history.push("/group/" + id);
	}

	return { toGroup };
};
