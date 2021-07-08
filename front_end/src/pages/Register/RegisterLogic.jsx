// Packages
import { useState } from 'react';

// Components

// Logic

// Context

// Styles

// Assets


export const RegisterLogic = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        if (email === "" || username === "" || password === "") {

        } else {
            console.log("Register");
        }
    }

    return { email, setEmail, username, setUsername, password, setPassword, submit }
}