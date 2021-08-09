// Packages
import React, { useRef, useState, useLayoutEffect } from "react";

// Components

// Logic

// Context

// Styles
import "./TextArea.css";

// Assets

export const TextArea = (props) => {
	let textArea = useRef(null);
	let textHeightElement = useRef(null);
	const [focused, setFocused] = useState(false);

	useLayoutEffect(() => {
		initialAutoSize();
	});

	function initialAutoSize() {
		if (textArea.current !== null && textHeightElement !== null) {
			textArea.current.setAttribute("style", "height: calc(" + textHeightElement.current.clientHeight + "px);");
			textHeightElement.current.setAttribute("style", "width: calc(" + textArea.current.clientWidth + "px);");
		}
	}

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
				ref={textArea}
				id={props.id ? props.id : "input"}
				value={props.value === undefined ? "" : props.value}
				onChange={props.onChange}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				type={props.type === undefined ? null : props.type}
			/>

			<div className='text-area-height-element'>
				<div ref={textHeightElement}>
					{props.value === undefined
						? ""
						: props.value.split("\n").map((paragraph, index) => {
								return <p key={index}>{paragraph}</p>;
						  })}
				</div>
			</div>
		</div>
	);
};
