// Packages
import { useState } from 'react';

// Components

// Logic

// Context

// Styles

// Assets


export const LoginLogic = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        if (username === "" || password === "") {

        } else {
            console.log("Log In");
        }
    }

    return { username, setUsername, password, setPassword, submit }
}