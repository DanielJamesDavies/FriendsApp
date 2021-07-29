// Packages
import { useRef, useContext, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const InterestListLogic = () => {
	const isMounted = useRef(false);
	const { id, token } = useContext(UserContext);
	const [searchValue, setSearchValue] = useState("");
	const [interests, setInterests] = useState(false);
	const [filteredInterests, setFilteredInterests] = useState(false);

	async function getInterests() {
		var result = await axios.get("http://localhost:3001/interest/find-new/" + id, {
			headers: {
				token: token,
			},
		});
		if (isMounted.current && result.data) {
			setInterests(result.data);
			setFilteredInterests(result.data);
		}
	}

	function changeSearchValue(e) {
		setSearchValue(e.target.value);
		setFilteredInterests(interests.filter((interest) => interest.name.toLowerCase().includes(e.target.value.toLowerCase())));
	}

	return { isMounted, searchValue, changeSearchValue, filteredInterests, getInterests };
};
