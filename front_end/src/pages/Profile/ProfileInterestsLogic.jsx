// Packages
import { useState } from "react";
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const ProfileInterestsLogic = () => {
	const history = useHistory();
	const [showAllInterests, setShowAllInterests] = useState(false);

	return { history, showAllInterests, setShowAllInterests };
};
