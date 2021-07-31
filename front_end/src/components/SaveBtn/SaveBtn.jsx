// Packages
import { FaSave } from "react-icons/fa";

// Components

// Logic

// Context

// Styles
import "./SaveBtn.css";

// Assets

export const SaveBtn = ({ isSaved, onClick }) => {
	return (
		<button className={isSaved ? "save-btn save-btn-saved" : "save-btn"} onClick={onClick}>
			<FaSave />
		</button>
	);
};
