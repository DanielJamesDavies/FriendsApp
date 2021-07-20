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
		<div className={inputClassName(props, focused)}>
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

function inputClassName(props, focused) {
	var className = "input";
	if (focused) className += " input-focused";
	if (props.value === undefined || props.value === "") className += " input-empty";
	return className;
}
