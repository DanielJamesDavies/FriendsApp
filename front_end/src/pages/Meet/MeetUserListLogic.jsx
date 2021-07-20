// Packages
import { useContext, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets
import users from "./users.json";

export const MeetUserListLogic = () => {
	const [loading, setLoading] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const [usersList, setUsersList] = useState(false);
	const [filteredUsersList, setFilteredUsersList] = useState(users);
	const { token, id } = useContext(UserContext);

	async function getUsers() {
		const users = await axios.get("http://localhost:3001/profile/", {
			headers: { token: token },
		});
		const userIndex = users.data.findIndex((user) => user._id === id);
		users.data.splice(userIndex, 1);
		setUsersList(users.data);
		setFilteredUsersList(users.data);
		setLoading(false);
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

	return { loading, searchValue, changeSearchValue, filteredUsersList, getUsers };
};
