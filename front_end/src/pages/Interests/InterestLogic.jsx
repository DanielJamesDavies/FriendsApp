// Packages
import { useContext, useRef, useState } from "react";
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
	const [loading, setLoading] = useState(true);

	async function addInterestToProfile(interest, setUserInterests) {
		setLoading(true);
		const result = await axios.post(
			"http://localhost:3001/profile/add-interest/" + id + "/" + interest._id,
			{},
			{
				headers: {
					token: token,
				},
			}
		);
		if (isMounted.current && result.data) {
			setUserInterests(result.data.profileInterests);
		}
		setLoading(false);
	}

	async function removeInterestFromProfile(interest, setUserInterests) {
		setLoading(true);
		const result = await axios.post(
			"http://localhost:3001/profile/remove-interest/" + id + "/" + interest._id,
			{},
			{
				headers: {
					token: token,
				},
			}
		);
		if (isMounted.current && result.data) {
			setUserInterests(result.data.profileInterests);
		}
		setLoading(false);
	}

	return { isMounted, loading, addInterestToProfile, removeInterestFromProfile };
};
