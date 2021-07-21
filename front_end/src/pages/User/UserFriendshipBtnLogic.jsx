// Packages
import { useContext } from "react";
import axios from "axios";

// Components

// Logic
import { UserContext } from "../../context/UserContext";

// Context

// Styles

// Assets

export const UserFriendshipBtnLogic = () => {
	const { token, id } = useContext(UserContext);

	async function sendFriendRequest(user_id, username, getUser) {
		await axios.post(
			"http://localhost:3001/friendship/request/" + id + "/" + user_id,
			{},
			{
				headers: {
					token: token,
				},
			}
		);
		getUser(username);
	}

	async function removeFriendRequest(user_id, username, getUser) {
		const result = await axios.post(
			"http://localhost:3001/friendship/remove/" + id + "/" + user_id,
			{},
			{
				headers: {
					token: token,
				},
			}
		);
		console.log(result);
		getUser(username);
	}

	return { sendFriendRequest, removeFriendRequest };
};
