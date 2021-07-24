// Packages
import { useContext, useEffect } from "react";
import { FaInfo, FaPencilAlt, FaTimes, FaSave, FaUndoAlt } from "react-icons/fa";

// Components

// Logic
import { ChatMessageLogic } from "./ChatMessageLogic";

// Context
import { UserContext } from "../../../context/UserContext";

// Styles
import "./ChatMessage.css";

// Assets

export const ChatMessage = ({ index, message, chat, setChat, setLoading, setMessageInfo }) => {
	const { id } = useContext(UserContext);
	const {
		isMounted,
		reading,
		editMessageId,
		editMessageHeight,
		editMessageWidth,
		readMessage,
		selectMessageToEdit,
		deleteMessage,
		editMessageText,
		changeMessageText,
		saveEditedMessage,
		revertMessageText,
	} = ChatMessageLogic();

	useEffect(() => {
		isMounted.current = true;

		if (message.user_id !== id && !message.read_by.includes(id) && !reading) readMessage(message, chat._id);

		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className={message.user_id === id ? "chat-message chat-message-self" : "chat-message chat-message-other"}>
			{message.user_id !== id || editMessageId === message._id ? null : (
				<div className='chat-message-options'>
					<button onClick={() => setMessageInfo(message)}>
						<FaInfo />
					</button>
					<button onClick={() => selectMessageToEdit(message)}>
						<FaPencilAlt />
					</button>
					<button onClick={() => deleteMessage(message, chat._id, setChat, setLoading)}>
						<FaTimes />
					</button>
				</div>
			)}
			{editMessageId !== message._id ? (
				<div className='chat-message-text'>
					{message.text.map((paragraph, index) => {
						return <p key={index}>{paragraph}</p>;
					})}
				</div>
			) : (
				<div className='chat-message-edit-text'>
					<div className='chat-message-edit-text-hidden' style={{ maxWidth: "calc(" + editMessageWidth + " - 32px)" }}>
						<div id='chat-message-edit-text-hidden'>
							{editMessageText.map((paragraph, index) => {
								return <p key={index}>{paragraph}</p>;
							})}
						</div>
					</div>

					<textarea
						id='chat-message-edit-textarea'
						value={editMessageText.join("\n")}
						placeholder='Enter Message'
						onChange={changeMessageText}
						style={{ height: editMessageHeight }}
					/>

					<button className='chat-message-edit-text-save-btn' onClick={() => saveEditedMessage(chat._id, setChat, setLoading)}>
						<FaSave />
					</button>

					<button className='chat-message-edit-text-revert-btn' onClick={revertMessageText}>
						<FaUndoAlt />
					</button>
				</div>
			)}
			{index + 1 !== chat.messages.length && chat.messages[index + 1].user_id === message.user_id ? null : (
				<div className='chat-message-user' key={index}>
					{message.user_id !== id ? (
						<img src={chat.participants.find((participant) => participant._id === message.user_id)?.profilePicture} alt='' />
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
						<img src={chat.participants.find((participant) => participant._id === message.user_id)?.profilePicture} alt='' />
					) : null}
				</div>
			)}
		</div>
	);
};
