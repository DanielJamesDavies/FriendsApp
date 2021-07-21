// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const MeetUserListLogic = () => {
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [usersList, setUsersList] = useState(false);
	const [filteredUsersList, setFilteredUsersList] = useState(false);
	const { token, id } = useContext(UserContext);

	async function getUsers() {
		const users = await axios.get("http://localhost:3001/profile/meet/" + id, {
			headers: { token: token },
		});
		if (isMounted.current) {
			setUsersList(users.data);
			setFilteredUsersList(users.data);
			setLoading(false);
		}
	}

	function changeSearchValue(e) {
		setSearchValue(e.target.value);
		setFilteredUsersList(
			usersList.filter(
				(user) =>
					user.nickname.toLowerCase().includes(e.target.value.toLowerCase()) ||
					user.username.toLowerCase().includes(e.target.value.toLowerCase())
			)
		);
	}

	return { isMounted, loading, searchValue, changeSearchValue, filteredUsersList, getUsers };
};
