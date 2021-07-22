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
			<img className='chat-top-icon' src={chat.icon} alt='' />
			<p className='chat-top-name'>{chat.name}</p>
		</div>
	);
};
