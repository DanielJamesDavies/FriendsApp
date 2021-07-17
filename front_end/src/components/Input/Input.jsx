// Packages
import React, { useState } from "react";

// Components

// Logic

// Context

// Styles
import "./Input.css";

// Assets

export const Input = (props) => {
	const [focused, setFocused] = useState(false);

	return (
		<div
			className={
				focused
					? props.value === undefined || props.value === ""
						? "input input-focused input-empty"
						: "input input-focused"
					: props.value === undefined || props.value === ""
					? "input input-empty"
					: "input"
			}
		>
			<label htmlFor='input'>{props.label}</label>

			<input
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
