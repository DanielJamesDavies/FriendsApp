// Packages

// Components

// Logic

// Context

// Styles

// Assets

export const UserTopLogic = () => {
	function compatibilityValueClassName(compatibility) {
		var className = "user-top-compatibility-value ";
		if (compatibility >= 0 && compatibility < 20) return className + "user-top-compatibility-value-very-low";
		if (compatibility >= 20 && compatibility < 40) return className + "user-top-compatibility-value-low";
		if (compatibility >= 40 && compatibility < 60) return className + "user-top-compatibility-value-medium";
		if (compatibility >= 60 && compatibility < 80) return className + "user-top-compatibility-value-high";
		if (compatibility >= 80 && compatibility < 100) return className + "user-top-compatibility-value-very-high";
	}

	return { compatibilityValueClassName };
};
