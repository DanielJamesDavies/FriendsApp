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
	const [form, setForm] = useState(0);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [bio, setBio] = useState("");
	const [description, setDescription] = useState([]);
	const [error, setError] = useState("");
	const history = useHistory();

	function switchForm() {
		if (email === "" || username === "" || password === "") return setError("Please enter an Email, Username and Password.");
		setError("");
		if (form === 0) return setForm(1);
		if (form === 1) return setForm(0);
	}

	async function submit() {
		if (nickname === "" || bio === "" || description.length === 0) return setError("Please enter a Nickname, Bio, and Description.");
		setError("");

		const submitData = {
			user: {
				username: username,
				email: email,
				password: password,
			},
			profile: {
				nickname: nickname,
				bio: bio,
				description: description,
			},
		};

		const registered = await axios.post("http://localhost:3001/user/", submitData);

		if (registered.data.error) return setError(registered.data.error);
		if (registered.data.message) return history.push("/login");
	}

	return {
		username,
		setUsername,
		email,
		setEmail,
		password,
		setPassword,
		nickname,
		setNickname,
		bio,
		setBio,
		description,
		setDescription,
		form,
		switchForm,
		submit,
		error,
	};
};
