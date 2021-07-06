// Packages
import { useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets
import userData from './userData.json';


export const UserLogic = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(userData[0]);

    return { loading, user }
}