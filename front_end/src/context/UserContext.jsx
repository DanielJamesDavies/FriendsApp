import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default ({ children }) => {
	const [token, setToken] = useState(false);
	const [id, setId] = useState(false);

	return <UserContext.Provider value={{ token, setToken, id, setId }}>{children}</UserContext.Provider>;
};
