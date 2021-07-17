// Packages
import { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const RegisterLogic = () => {
	const history = useHistory();
	const [form, setForm] = useState(0);
	const [error, setError] = useState("");
	const addProfilePictureInputRef = useRef();
	const addBackgroundImageInputRef = useRef();

	// Form Data
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [bio, setBio] = useState("");
	const [description, setDescription] = useState([]);
	const [profilePicture, setProfilePicture] = useState("");
	const [backgroundImage, setBackgroundImage] = useState([]);

	function switchForm() {
		if (email === "" || username === "" || password === "") return setError("Please enter an Email, Username and Password.");
		setError("");
		if (form === 0) return setForm(1);
		if (form === 1) return setForm(0);
	}

	function changeProfilePicture(e) {
		if (e.target.files.length !== 0)
			convertToBase64(e.target.files[0]).then((res) => {
				setProfilePicture(res);
			});
	}

	function changeBackgroundImage(e) {
		if (e.target.files.length !== 0)
			convertToBase64(e.target.files[0]).then((res) => {
				setBackgroundImage(res);
			});
	}

	async function convertToBase64(file) {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				resolve(fileReader.result);
			};
			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	}

	async function submit() {
		if (nickname === "" || bio === "" || description.length === 0 || profilePicture.length === 0 || backgroundImage.length === 0)
			return setError("Please add a Profile Picture and Background Image, and enter a Nickname, Bio, and Description.");
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
				profilePicture: profilePicture,
				backgroundImage: backgroundImage,
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
		profilePicture,
		changeProfilePicture,
		backgroundImage,
		changeBackgroundImage,
		form,
		switchForm,
		submit,
		error,
		addProfilePictureInputRef,
		addBackgroundImageInputRef,
	};
};
