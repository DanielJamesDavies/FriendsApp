// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const InterestsListLogic = () => {
	const history = useHistory();
	const { token } = useContext(UserContext);
	const isMounted = useRef(false);
	const [loading, setLoading] = useState(true);
	const [interestsList, setInterestsList] = useState(false);
	const [filteredInterestsList, setFilteredInterestsList] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	async function getInterests() {
		var result = await axios.get("http://localhost:3001/interest/", {
			headers: {
				token: token,
			},
		});
		if (isMounted.current && result.data) {
			setInterestsList(result.data);
			setFilteredInterestsList(result.data);
			setLoading(false);
		}
	}

	function changeSearchValue(e) {
		setSearchValue(e.target.value);
		setFilteredInterestsList(interestsList.filter((interest) => interest.name.toLowerCase().includes(e.target.value.toLowerCase())));
	}

	function openInterest(interest, setInterest) {
		setInterest(interest);
		history.push("/interests/" + interest._id);
	}

	return {
		isMounted,
		loading,
		filteredInterestsList,
		searchValue,
		getInterests,
		changeSearchValue,
		openInterest,
	};
};
