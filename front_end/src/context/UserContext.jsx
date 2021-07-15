import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default ({ children }) => {
	const [user, setUser] = useState({
		id: 0,
		username: "username",
		nickname: "nickname",
		settings: { theme: "light" },
	});
	const [authorised, setAuthorised] = useState(false);

	return (
		<UserContext.Provider
			value={{ user, setUser, authorised, setAuthorised }}
		>
			{children}
		</UserContext.Provider>
	);
};
