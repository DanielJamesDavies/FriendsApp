// Packages

// Components

// Logic
import { ChatItemLogic } from "./ChatItemLogic";

// Context

// Styles
import "./ChatItem.css";

// Assets

export const ChatItem = ({ chat, notificationIcon }) => {
	const { toChat } = ChatItemLogic();
	if (notificationIcon) var DynamicNotificationIcon = notificationIcon;

	return (
		<div className='chat-item' onClick={() => toChat(chat._id)}>
			<div className='chat-item-notification-container'>
				{false ? (
					<div className={"chat-item-notification"}>
						<DynamicNotificationIcon />
					</div>
				) : null}
			</div>

			<div className='chat-item-icon'>
				{chat.icon ? (
					<img src={chat.icon} alt='' />
				) : (
					<svg height='50' width='50'>
						<circle cx='25' cy='25' r='25' />
					</svg>
				)}
			</div>

			<div className='chat-item-text'>
				<p className='chat-item-name'>{chat.name}</p>
				<p className='chat-item-last-message'>
					{chat.messages && chat.messages.length !== 0 ? chat.messages[chat.messages.length - 1] : "There are no messages in this chat."}
				</p>
			</div>

			{chat.banner === undefined ? null : (
				<div className='chat-item-banner-container'>
					<div className='chat-item-banner-hover-filter' />
					<img src={chat.banner} className='chat-item-banner' alt='' />
				</div>
			)}
		</div>
	);
};
