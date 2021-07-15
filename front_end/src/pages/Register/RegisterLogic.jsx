// Packages
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const RegisterLogic = () => {
	const [username, setUsername] = useState("");
	const [nickname, setNickname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const history = useHistory();

	async function submit() {
		if (email === "" || username === "" || password === "")
			return setError("Please enter an Email, Username and Password.");

		const registered = await axios.post("http://localhost:3001/user/", {
			username: username,
			nickname: nickname,
			email: email,
			password: password,
		});

		if (registered.data.error) return setError(registered.data.error);
		if (registered.data.message) return history.push("/login");
	}

	return {
		username,
		setUsername,
		nickname,
		setNickname,
		email,
		setEmail,
		password,
		setPassword,
		submit,
	};
};
