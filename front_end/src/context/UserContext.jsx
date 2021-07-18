import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default ({ children }) => {
	const [user, setUser] = useState({
		id: 0,
		username: "username",
		nickname: "nickname",
		settings: { theme: "light" },
	});
	const [token, setToken] = useState(false);
	const [id, setId] = useState(false);

	return <UserContext.Provider value={{ user, setUser, token, setToken, id, setId }}>{children}</UserContext.Provider>;
};
