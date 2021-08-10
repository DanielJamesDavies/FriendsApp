// Packages
import { cloneElement } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const DragDropItemLogic = ({ itemsAreInline }) => {
	function dragDropItemClassName(index, draggingItem) {
		var className = "drag-drop-item";
		if (itemsAreInline) className += " drag-drop-item-inline";
		if (draggingItem && draggingItem.props.dragkey === index) className += " drag-drop-item-dragging";
		return className;
	}

	function dragStart(e, children, setDraggingItem) {
		var dragkey = parseInt(e.target.getAttribute("drag-key"));
		if (isNaN(dragkey)) dragkey = -1;
		var newDraggingItem = cloneElement(children, { dragkey });
		if (setDraggingItem !== undefined) setDraggingItem(newDraggingItem);
	}

	function dragOver(e) {
		e.preventDefault();
	}

	function dragEnter(e, draggingItem, order, setOrder, setChangedOrder) {
		if (draggingItem) {
			if (e.target.parentNode && e.target.parentNode.classList && e.target.parentNode.classList.contains("drag-drop-item"))
				return moveOrderItem(
					draggingItem.props.dragkey,
					parseInt(e.target.parentNode.getAttribute("drag-key")),
					order,
					setOrder,
					setChangedOrder
				);
			if (
				e.target.parentNode.parentNode &&
				e.target.parentNode.parentNode.classList &&
				e.target.parentNode.parentNode.classList.contains("drag-drop-item")
			)
				return moveOrderItem(
					draggingItem.props.dragkey,
					parseInt(e.target.parentNode.parentNode.getAttribute("drag-key")),
					order,
					setOrder,
					setChangedOrder
				);
		}
	}

	function moveOrderItem(source, destination, setOrder, setChangedOrder) {
		if (isNaN(destination)) return;

		setOrder((oldOrder) => {
			var newOrder = JSON.parse(JSON.stringify(oldOrder));

			var sourceIndex = newOrder.indexOf(source);
			var destinationIndex = newOrder.indexOf(destination);
			if (sourceIndex === -1 || destinationIndex === -1) return newOrder;

			newOrder.splice(destinationIndex, 0, newOrder.splice(sourceIndex, 1)[0]);

			setChangedOrder({ source: source, destination: destinationIndex });
			return newOrder;
		});
	}

	function dragEnd(e, setDraggingItem, changedOrder, onDropItem) {
		if (setDraggingItem !== undefined) setDraggingItem(false);
		onDropItem(changedOrder);
	}

	return { dragDropItemClassName, dragStart, dragOver, dragEnter, dragEnd };
};
