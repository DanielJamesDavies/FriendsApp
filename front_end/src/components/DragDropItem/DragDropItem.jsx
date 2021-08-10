// Packages

// Components

// Logic
import { DragDropItemLogic } from "./DragDropItemLogic";

// Context

// Styles
import "./DragDropItem.css";

// Assets

export const DragDropItem = ({
	children,
	index,
	itemsAreInline,
	draggingItem,
	setDraggingItem,
	setOrder,
	changedOrder,
	setChangedOrder,
	onDropItem,
}) => {
	const { dragDropItemClassName, dragStart, dragOver, dragEnter, dragEnd } = DragDropItemLogic({ itemsAreInline });

	return (
		<div
			drag-key={index}
			className={dragDropItemClassName(index, draggingItem)}
			onDragStart={(e) => dragStart(e, children, setDraggingItem)}
			onDragEnd={(e) => dragEnd(e, setDraggingItem, changedOrder, onDropItem)}
		>
			<div
				draggable='true'
				dropzone='move'
				className='drag-drop-item-drag'
				onDragOver={(e) => dragOver(e)}
				onDragEnter={(e) => dragEnter(e, draggingItem, setOrder, setChangedOrder, onDropItem)}
			></div>
			{children}
		</div>
	);
};
