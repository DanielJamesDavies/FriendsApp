import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default ({ children }) => {
	const [token, setToken] = useState(false);
	const [id, setId] = useState(false);
	const [profilePicture, setProfilePicture] = useState(false);

	return <UserContext.Provider value={{ token, setToken, id, setId, profilePicture, setProfilePicture }}>{children}</UserContext.Provider>;
};
