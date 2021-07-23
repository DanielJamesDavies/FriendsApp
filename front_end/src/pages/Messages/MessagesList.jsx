// Packages
import { useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

// Components
import { Loading } from "../../components/Loading/Loading";
import { ChatItem } from "../../components/ChatItem/ChatItem";
import { Input } from "../../components/Input/Input";

// Logic
import { MessagesListLogic } from "./MessagesListLogic";

// Context

// Styles
import "./MessagesList.css";

// Assets

export const MessagesList = () => {
	const { isMounted, loading, searchValue, changeSearchValue, filteredChatsList, getChats } = MessagesListLogic();

	useEffect(() => {
		isMounted.current = true;
		getChats();
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<div className='chats-list-container'>
				<div className='chats-list'>
					<div className='chats-list-search-bar'>
						<Input
							value={searchValue}
							onChange={changeSearchValue}
							label={"Search for Chats"}
							icon={FaSearch}
							autocomplete={"off"}
						></Input>
					</div>

					<div className='chats-list-items-container'>
						{filteredChatsList.map((chat, index) => (
							<ChatItem key={index} chat={chat} notificationIcon={FaPlus} />
						))}
					</div>
				</div>
			</div>
		);
	}
};
