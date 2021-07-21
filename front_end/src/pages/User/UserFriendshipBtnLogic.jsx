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
	const { token, id, setFavouriteFriends } = useContext(UserContext);

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
		await axios.post(
			"http://localhost:3001/friendship/remove/" + id + "/" + user_id,
			{},
			{
				headers: {
					token: token,
				},
			}
		);
		getUser(username);
	}

	async function addFavourite(user_id, username, getUser) {
		const result = await axios.post(
			"http://localhost:3001/friendship/favourite/" + id + "/" + user_id,
			{},
			{
				headers: {
					token: token,
				},
			}
		);
		if (result.data.favouriteFriends) setFavouriteFriends(result.data.favouriteFriends);
		getUser(username);
	}

	return { sendFriendRequest, removeFriendRequest, addFavourite };
};
