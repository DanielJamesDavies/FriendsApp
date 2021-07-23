// Packages
import { useEffect } from "react";

// Components

// Logic
import { ChatItemLogic } from "./ChatItemLogic";

// Context

// Styles
import "./ChatItem.css";

// Assets

export const ChatItem = ({ chat, notificationIcon }) => {
	const { isMounted, toChat } = ChatItemLogic();
	if (notificationIcon) var DynamicNotificationIcon = notificationIcon;

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

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
					{chat.lastMessage ? chat.lastMessage.nickname + ": " + chat.lastMessage.text : "There are no messages in this chat."}
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
