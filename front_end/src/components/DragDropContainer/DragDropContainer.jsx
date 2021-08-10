// Packages

// Components

// Logic
import { DragDropContainerLogic } from "./DragDropContainerLogic";

// Context

// Styles

// Assets

export const DragDropContainer = ({ children, className, itemsAreInline, onDropItem }) => {
	const { updatedChildren } = DragDropContainerLogic({ children, itemsAreInline, onDropItem });

	return <div className={className === undefined ? "drag-drop-container" : "drag-drop-container " + className}>{updatedChildren}</div>;
};
