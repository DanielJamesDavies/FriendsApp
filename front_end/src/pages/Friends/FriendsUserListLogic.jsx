// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const FriendsUserListLogic = () => {
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [friendsList, setFriendsList] = useState(false);
	const [filteredFriendsList, setFilteredFriendsList] = useState(false);
	const { token, id } = useContext(UserContext);

	async function getFriends() {
		const friends = await axios.get("http://localhost:3001/profile/friends/" + id, {
			headers: { token: token },
		});
		if (isMounted.current) {
			setFriendsList(friends.data);
			setFilteredFriendsList(friends.data);
			setLoading(false);
		}
	}

	function changeSearchValue(e) {
		setSearchValue(e.target.value);
		setFilteredFriendsList(
			friendsList.filter(
				(friend) =>
					friend.nickname.toLowerCase().includes(e.target.value.toLowerCase()) ||
					friend.username.toLowerCase().includes(e.target.value.toLowerCase())
			)
		);
	}

	return { isMounted, loading, searchValue, changeSearchValue, filteredFriendsList, getFriends };
};
