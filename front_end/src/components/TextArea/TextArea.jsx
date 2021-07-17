// Packages
import React, { useState } from "react";

// Components

// Logic

// Context

// Styles
import "./TextArea.css";

// Assets

export const TextArea = (props) => {
	const [focused, setFocused] = useState(false);

	return (
		<div
			className={
				focused
					? props.value === undefined || props.value.length === 0 || (props.value.length === 1 && props.value[0] === "")
						? "text-area text-area-focused text-area-empty"
						: "text-area text-area-focused"
					: props.value === undefined || props.value.length === 0 || (props.value.length === 1 && props.value[0] === "")
					? "text-area text-area-empty"
					: "text-area"
			}
		>
			<label htmlFor='text-area'>{props.label}</label>

			<textarea
				value={props.value === undefined ? "" : props.value}
				onChange={props.onChange}
				id={props.id ? props.id : "input"}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				type={props.type === undefined ? null : props.type}
			/>
		</div>
	);
};
