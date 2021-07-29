// Packages

// Components

// Logic

// Context

// Styles

// Assets

export const InterestLogic = () => {
	async function addInterest(interest, onCloseInterestList) {
		onCloseInterestList();
	}

	return { addInterest };
};
