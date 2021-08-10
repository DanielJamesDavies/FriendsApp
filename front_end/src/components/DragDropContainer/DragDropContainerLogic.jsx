// Packages
import { useEffect, useState, isValidElement, cloneElement } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const DragDropContainerLogic = ({ children, itemsAreInline, onDropItem }) => {
	var defaultOrder = children
		.map((child, index) => {
			var key = parseInt(child.key);
			if (!isNaN(key)) return index;
			return -1;
		})
		.filter((child) => child !== -1);

	const [order, setOrder] = useState(defaultOrder);
	const [changedOrder, setChangedOrder] = useState(false);
	const [updatedChildren, setUpdatedChildren] = useState(children);
	const [draggingItem, setDraggingItem] = useState(false);

	useEffect(() => {
		var children2 = order.map((key) => {
			return children.find((child) => parseInt(child.key) === key);
		});

		var newChildren = children2.map((child) => {
			if (!isValidElement(child)) return child;
			return cloneElement(child, {
				itemsAreInline,
				draggingItem,
				setDraggingItem,
				order,
				setOrder,
				onDropItem,
				changedOrder,
				setChangedOrder,
			});
		});

		setUpdatedChildren(newChildren);
		// eslint-disable-next-line
	}, [order]);

	useEffect(() => {
		setOrder(defaultOrder);

		var newChildren = children.map((child) => {
			if (!isValidElement(child)) return child;
			return cloneElement(child, {
				itemsAreInline,
				draggingItem,
				setDraggingItem,
				order,
				setOrder,
				onDropItem,
				changedOrder,
				setChangedOrder,
			});
		});

		setUpdatedChildren(newChildren);
		// eslint-disable-next-line
	}, [draggingItem]);

	return { updatedChildren };
};
