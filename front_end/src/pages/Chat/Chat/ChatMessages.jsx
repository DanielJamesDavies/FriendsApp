// Packages

// Components
import { ChatMessage } from "./ChatMessage";
import { ChatMessageInfo } from "./ChatMessageInfo";

// Logic
import { ChatMessagesLogic } from "./ChatMessagesLogic";

// Context

// Styles
import "./ChatMessages.css";
import { useEffect } from "react";

// Assets

export const ChatMessages = ({ chat, setChat, setLoading, chatInputHeight }) => {
	const { messageInfo, setMessageInfo } = ChatMessagesLogic();

	return (
		<>
			<div
				className='chat-messages-container'
				style={{
					height: "calc(100vh - 10px - 70px - 10px - " + chatInputHeight + " - 10px - 30px - 4px)",
					width: "calc(100% - 24px" + (messageInfo ? " - 450px" : "") + ")",
				}}
			>
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
							<ChatMessage
								key={index}
								index={index}
								message={message}
								chat={chat}
								setChat={setChat}
								setLoading={setLoading}
								setMessageInfo={setMessageInfo}
							/>
						))}
					</>
				)}
			</div>

			<ChatMessageInfo messageInfo={messageInfo} setMessageInfo={setMessageInfo} chatInputHeight={chatInputHeight} />
		</>
	);
};
