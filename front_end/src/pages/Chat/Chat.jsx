// Packages
import { useEffect } from "react";

// Components
import { Loading } from "../../components/Loading/Loading";
import { ChatsTop } from "./Chats/ChatsTop";
import { ChatsList } from "./Chats/ChatsList";
import { ChatTop } from "./Chat/ChatTop";
import { ChatMessages } from "./Chat/ChatMessages";
import { ChatInput } from "./Chat/ChatInput";

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

			{!loading ? null : (
				<div className='chat-container'>
					<div className='chat-top'></div>
					<Loading />
				</div>
			)}

			{!chat ? null : (
				<div className='chat-container' style={loading ? { display: "none" } : {}}>
					{!chat.banner ? null : <img className='chat-image-background' src={chat.banner} alt='' />}
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
