import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState({ "id": 0, "username": "username", "nickname": "nickname", "settings": { "theme": "light" } });

    return (
        <UserContext.Provider
            value={{ user, setUser }}
        >
            {children}
        </UserContext.Provider>
    );
};
