import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";

export const UserContext = createContext();

// eslint-disable-next-line
export default ({ children }) => {
	const [token, setToken] = useState(false);
	const [id, setId] = useState(false);
	const [profilePicture, setProfilePicture] = useState(false);
	const [favouriteFriends, setFavouriteFriends] = useState(false);
	const [socket, setSocket] = useState(false);

	useEffect(() => {
		if (token) setSocket(io.connect("http://localhost:3001/"));
	}, [token]);

	return (
		<UserContext.Provider
			value={{ token, setToken, id, setId, profilePicture, setProfilePicture, favouriteFriends, setFavouriteFriends, socket }}
		>
			{children}
		</UserContext.Provider>
	);
};
