// Packages
import { useEffect } from "react";

// Components
import { Loading } from "../../components/Loading/Loading";
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
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<div className='page chat-page'>
				<ChatTop chat={chat} setChat={setChat} setLoading={setLoading} />
				<ChatMessages
					chat={chat}
					setChat={setChat}
					setLoading={setLoading}
					chatInputHeight={chatInputHeight}
					setChatInputHeight={setChatInputHeight}
				/>
				<ChatInput
					chat={chat}
					setChat={setChat}
					setLoading={setLoading}
					chatInputHeight={chatInputHeight}
					setChatInputHeight={setChatInputHeight}
				/>
			</div>
		);
	}
};
