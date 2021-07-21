// Packages
import { useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets
import groupsData from "./groupsData.json";

export const GroupsLogic = () => {
	const [groups, setGroups] = useState(groupsData);

	return { groups, setGroups };
};
