import React, { createContext, useState } from "react";

export const UserContext = createContext();

// eslint-disable-next-line
export default ({ children }) => {
	const [token, setToken] = useState(false);
	const [id, setId] = useState(false);
	const [profilePicture, setProfilePicture] = useState(false);
	const [favouriteFriends, setFavouriteFriends] = useState(false);

	return (
		<UserContext.Provider value={{ token, setToken, id, setId, profilePicture, setProfilePicture, favouriteFriends, setFavouriteFriends }}>
			{children}
		</UserContext.Provider>
	);
};
