// Packages

// Components

// Logic

// Context

// Styles
import "./ChatTop.css";

// Assets

export const ChatTop = ({ chat }) => {
	return (
		<div className='chat-top'>
			<p>{chat.name}</p>
		</div>
	);
};
