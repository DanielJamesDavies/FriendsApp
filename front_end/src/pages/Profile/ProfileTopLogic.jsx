// Packages
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const ProfileTopLogic = () => {
	const history = useHistory();

	function compatibilityValueClassName(compatibility) {
		var className = "profile-top-compatibility-value ";
		if (compatibility >= 0 && compatibility < 20) return className + "profile-top-compatibility-value-very-low";
		if (compatibility >= 20 && compatibility < 40) return className + "profile-top-compatibility-value-low";
		if (compatibility >= 40 && compatibility < 60) return className + "profile-top-compatibility-value-medium";
		if (compatibility >= 60 && compatibility < 80) return className + "profile-top-compatibility-value-high";
		if (compatibility >= 80 && compatibility < 100) return className + "profile-top-compatibility-value-very-high";
	}

	return { history, compatibilityValueClassName };
};
