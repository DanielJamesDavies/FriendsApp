// Packages
import { useContext, useRef } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const InterestLogic = () => {
	const { id, token } = useContext(UserContext);
	const isMounted = useRef(false);

	async function addInterestToProfile(interest, setUserInterests) {
		const result = await axios.post(
			"http://localhost:3001/profile/add-interest/" + id + "/" + interest._id,
			{},
			{
				headers: {
					token: token,
				},
			}
		);
		if (isMounted.current && result.data) setUserInterests(result.data.profileInterests);
	}

	async function removeInterestFromProfile(interest, setUserInterests) {
		const result = await axios.post(
			"http://localhost:3001/profile/remove-interest/" + id + "/" + interest._id,
			{},
			{
				headers: {
					token: token,
				},
			}
		);
		if (isMounted.current && result.data) setUserInterests(result.data.profileInterests);
	}

	return { isMounted, addInterestToProfile, removeInterestFromProfile };
};
