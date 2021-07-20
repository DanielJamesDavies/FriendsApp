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
	if (props.icon) var DynamicIconComponent = props.icon;

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
			<div className='label'>
				{props.icon ? <DynamicIconComponent /> : null}
				<label htmlFor='input'>{props.label}</label>
			</div>

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
