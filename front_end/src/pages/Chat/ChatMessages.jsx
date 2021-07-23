// Packages
import { useContext } from "react";
import { FaInfo, FaPencilAlt, FaTimes, FaSave, FaUndoAlt } from "react-icons/fa";

// Components

// Logic
import { ChatMessagesLogic } from "./ChatMessagesLogic";

// Context
import { UserContext } from "../../context/UserContext";

// Styles
import "./ChatMessages.css";

// Assets

export const ChatMessages = ({ chat, setChat, setLoading, chatInputHeight }) => {
	const { id } = useContext(UserContext);
	const {
		editMessageId,
		editMessageHeight,
		editMessageWidth,
		selectMessageToEdit,
		editMessageText,
		changeMessageText,
		saveEditedMessage,
		revertMessageText,
	} = ChatMessagesLogic();

	return (
		<div className='chat-messages-container' style={{ height: "calc(100vh - 10px - 70px - 10px - " + chatInputHeight + " - 30px - 10px)" }}>
			{chat.messages.length === 0 ? (
				<p>There are no currently messages in this chat.</p>
			) : (
				<>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					{chat.messages.map((message, index) => (
						<div className={message.user_id === id ? "chat-message chat-message-self" : "chat-message chat-message-other"} key={index}>
							{message.user_id !== id || editMessageId === message._id ? null : (
								<div className='chat-message-options'>
									<button>
										<FaInfo />
									</button>
									<button onClick={() => selectMessageToEdit(message)}>
										<FaPencilAlt />
									</button>
									<button>
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
									<div className='chat-message-edit-text-hidden' style={{ width: "calc(" + editMessageWidth + " - 32px)" }}>
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

									<button
										className='chat-message-edit-text-save-btn'
										onClick={() => saveEditedMessage(chat._id, setChat, setLoading)}
									>
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
										<img
											src={chat.participants.find((participant) => participant._id === message.user_id)?.profilePicture}
											alt=''
										/>
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
										<img
											src={chat.participants.find((participant) => participant._id === message.user_id)?.profilePicture}
											alt=''
										/>
									) : null}
								</div>
							)}
						</div>
					))}
				</>
			)}
		</div>
	);
};
