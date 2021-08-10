// Packages
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const ProfileInterestsLogic = ({ setInterests }) => {
	const { id, token } = useContext(UserContext);
	const history = useHistory();
	const [showAllInterests, setShowAllInterests] = useState(false);
	const [isRearranging, setIsRearranging] = useState(false);

	function toggleIsRearranging() {
		setIsRearranging((oldIsRearranging) => {
			return !oldIsRearranging;
		});
	}

	async function onInterestDrag(res) {
		var interests = [];
		setInterests((oldInterests) => {
			var newInterests = JSON.parse(JSON.stringify(oldInterests));
			var tempInterest = newInterests.splice(res.source, 1)[0];
			newInterests.splice(res.destination, 0, tempInterest);
			interests = newInterests.map((interest) => {
				return interest._id;
			});
			return newInterests;
		});

		await axios.post("http://localhost:3001/profile/" + id, { interests }, { headers: { token } });
	}

	return { history, showAllInterests, setShowAllInterests, isRearranging, toggleIsRearranging, onInterestDrag };
};
