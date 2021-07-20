// Packages
import { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const LoginLogic = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { setToken, setId } = useContext(UserContext);
	const history = useHistory();

	async function submit() {
		if (username === "" || password === "") return setError("Please enter a Username and a Password.");

		setLoading(true);
		const loggedIn = await axios.post("http://localhost:3001/user/login", {
			username: username,
			password: password,
		});

		if (loggedIn.data.error) {
			setLoading(false);
			return setError(loggedIn.data.error);
		}
		if (loggedIn.data.token) {
			setToken(loggedIn.data.token);
			setId(loggedIn.data.id);
			history.push("/profile/");
		}
	}

	return { username, setUsername, password, setPassword, error, submit, loading };
};
