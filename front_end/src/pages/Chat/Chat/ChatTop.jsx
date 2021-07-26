// Packages
import { FaEdit } from "react-icons/fa";

// Components

// Logic

// Context

// Styles
import "./ChatTop.css";

// Assets

export const ChatTop = ({ chat, setChat, setLoading, setIsEditingChat }) => {
	return (
		<div className='chat-top'>
			{chat.icon ? (
				<img className='chat-top-icon' src={chat.icon} alt='' />
			) : (
				<svg className='chat-top-icon' height='50' width='50'>
					<circle cx='25' cy='25' r='25' />
				</svg>
			)}
			<p className='chat-top-name'>{chat.name}</p>
			<button className='chat-top-edit-btn' onClick={() => setIsEditingChat(true)}>
				<FaEdit />
			</button>
		</div>
	);
};
