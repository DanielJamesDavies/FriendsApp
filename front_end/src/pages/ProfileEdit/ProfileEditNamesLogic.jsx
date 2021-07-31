// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const ProfileEditNamesLogic = ({ profile }) => {
	const { id, token } = useContext(UserContext);
	const isMounted = useRef(false);
	const [nickname, setNickname] = useState(profile.nickname);
	const [username, setUsername] = useState(profile.username);
	const [usernameAvailableMessage, setUsernameAvailableMessage] = useState("Current username");

	async function saveNickname(setProfile) {
		if (nickname === profile.nickname || nickname.split(" ").join("") === "") return false;
		var result = await axios.post("http://localhost:3001/profile/" + id, { nickname: nickname }, { headers: { token: token } });
		if (result.data && result.data.profile) {
			setProfile(result.data.profile);
		}
	}

	function revertNickname() {
		setNickname(profile.nickname);
	}

	async function changeUsername(e) {
		setUsername(e);
		if (e === profile.username) return setUsernameAvailableMessage("Current username");
		var result = await axios.post("http://localhost:3001/user/username-available", { username: e }, { headers: { token: token } });
		if (result.data) {
			if (result.data.message) return setUsernameAvailableMessage("Username available");
			if (result.data.error) return setUsernameAvailableMessage("Username not available");
		}
	}

	async function saveUsername(setProfile) {
		if (!usernameAvailableMessage || username === profile.username || username.split(" ").join("") === "") return false;
		var result = await axios.post("http://localhost:3001/user/change-username", { username: username }, { headers: { token: token } });
		if (result.data && result.data.profile) {
			setProfile(result.data.profile);
		}
	}

	function revertUsername() {
		setUsername(profile.username);
	}

	return {
		isMounted,
		nickname,
		setNickname,
		username,
		changeUsername,
		saveNickname,
		revertNickname,
		saveUsername,
		revertUsername,
		usernameAvailableMessage,
	};
};
