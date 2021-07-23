// Packages
import { useEffect } from "react";

// Components
import { Loading } from "../../components/Loading/Loading";
import { ChatsTop } from "./ChatsTop";
import { ChatsList } from "./ChatsList";
import { ChatTop } from "./ChatTop";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

// Logic
import { ChatLogic } from "./ChatLogic";

// Context

// Styles
import "../Pages.css";
import "./Chat.css";

// Assets

export const Chat = (props) => {
	const { isMounted, loading, setLoading, chat, setChat, getChat, chatInputHeight, setChatInputHeight } = ChatLogic();

	useEffect(() => {
		isMounted.current = true;
		getChat(props.match.params.id);
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, [props.match.params.id]);

	return (
		<div className='page chat-page'>
			<div className='chats-container'>
				<ChatsTop />
				<ChatsList />
			</div>

			{loading ? (
				<div className='chat-container'>
					<div className='chat-top'></div>
					<Loading />
				</div>
			) : (
				<div className='chat-container'>
					<ChatTop chat={chat} setChat={setChat} setLoading={setLoading} />
					<ChatMessages chat={chat} setChat={setChat} setLoading={setLoading} chatInputHeight={chatInputHeight} />
					<ChatInput
						chat={chat}
						setChat={setChat}
						setLoading={setLoading}
						chatInputHeight={chatInputHeight}
						setChatInputHeight={setChatInputHeight}
					/>
				</div>
			)}
		</div>
	);
};
