// Packages
import { FaPaperPlane } from "react-icons/fa";

// Components

// Logic
import { ChatInputLogic } from "./ChatInputLogic";

// Context

// Styles
import "./ChatInput.css";

// Assets

export const ChatInput = ({ chat, setChat, setLoading }) => {
	const { text, setText, sendMessage } = ChatInputLogic();
	return (
		<div className='chat-input-container'>
			<textarea className='chat-input' value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter Message' />
			<button className='chat-input-btn' onClick={() => sendMessage(chat._id, setChat, setLoading)}>
				<FaPaperPlane />
			</button>
		</div>
	);
};
