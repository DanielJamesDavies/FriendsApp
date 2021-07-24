// Packages
import { FaPaperPlane } from "react-icons/fa";

// Components

// Logic
import { ChatInputLogic } from "./ChatInputLogic";

// Context

// Styles
import "./ChatInput.css";

// Assets

export const ChatInput = ({ chat, setChat, setLoading, chatInputHeight, setChatInputHeight }) => {
	const { text, changeText, sendMessage, sending, setSending } = ChatInputLogic();

	return (
		<div className='chat-input-container'>
			<div className='chat-input-text'>
				<div id='chat-input-text'>
					{text.map((paragraph, index) => {
						return <p key={index}>{paragraph}</p>;
					})}
				</div>
			</div>
			<textarea
				className='chat-input'
				value={text.join("\n")}
				onChange={(e) => changeText(e, setChatInputHeight)}
				placeholder='Enter Message'
				style={{ height: chatInputHeight }}
			/>
			<button
				className={sending ? "chat-input-btn chat-input-btn-sending" : "chat-input-btn"}
				onClick={() => setSending(true)}
				onAnimationEnd={() => sendMessage(chat._id, setChat, setLoading)}
			>
				<FaPaperPlane />
			</button>
		</div>
	);
};
