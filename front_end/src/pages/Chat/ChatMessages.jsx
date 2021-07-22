// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles
import "./ChatMessages.css";

// Assets

export const ChatMessages = ({ chat, getChat }) => {
	const { id } = useContext(UserContext);

	return (
		<div className='chat-messages-container'>
			{chat.messages.length !== 0 ? null : <p>There are no currently messages in this chat.</p>}
			{chat.messages.map((message, index) => (
				<div className={message.user_id === id ? "chat-message chat-message-self" : "chat-message chat-message-other"} key={index}>
					<div className='chat-message'></div>
					<p className='chat-message-text'>{message.text}</p>
					{index + 1 !== chat.messages.length && chat.messages[index + 1].user_id === message.user_id ? null : (
						<div className='chat-message-user' key={index}>
							{message.user_id !== id ? (
								<img src={chat.participants.find((participant) => participant._id === message.user_id)?.profilePicture} />
							) : null}
							<div className='chat-message-user-names'>
								<p className='chat-message-nickname'>
									{chat.participants.find((participant) => participant._id === message.user_id)?.nickname}
								</p>
								<p className='chat-message-username'>
									@{chat.participants.find((participant) => participant._id === message.user_id)?.username}
								</p>
							</div>
							{message.user_id === id ? (
								<img src={chat.participants.find((participant) => participant._id === message.user_id)?.profilePicture} />
							) : null}
						</div>
					)}
				</div>
			))}
		</div>
	);
};
