// Packages
import { FaUndoAlt } from "react-icons/fa";

// Components

// Logic

// Context

// Styles
import "./RevertBtn.css";

// Assets

export const RevertBtn = ({ isSaved, onClick }) => {
	return (
		<button className={isSaved ? "revert-btn revert-btn-saved" : "revert-btn"} onClick={onClick}>
			<FaUndoAlt />
		</button>
	);
};
