// Packages
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

// Components
import { Loading } from "../../../components/Loading/Loading";

// Logic
import { ChatMessageInfoLogic } from "./ChatMessageInfoLogic";

// Context

// Styles
import "./ChatMessageInfo.css";

// Assets

export const ChatMessageInfo = ({ messageInfo, setMessageInfo, chatInputHeight }) => {
	const { isMounted, loading, setLoading, readByProfiles, setReadByProfiles, getReadByProfiles } = ChatMessageInfoLogic();

	useEffect(() => {
		isMounted.current = true;

		if (messageInfo) {
			if (messageInfo.read_by.length === 0) setReadByProfiles(false);
			if (messageInfo.read_by.length !== 0) getReadByProfiles(messageInfo.read_by, messageInfo, setMessageInfo);
			if (messageInfo.read_by.length === 0) setLoading(false);
		}

		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, [messageInfo]);

	if (!messageInfo) return null;

	var date = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toUTCString();

	if (loading)
		return (
			<div
				className='chat-message-info-container'
				style={{
					height: "calc(100vh - 10px - 70px - 10px - " + chatInputHeight + " - 30px - 60px)",
				}}
			>
				<div className='chat-message-info-title'>
					<button className='chat-message-info-close-btn' onClick={() => setMessageInfo(false)}>
						<FaTimes />
					</button>
					<p>Message Information</p>
				</div>
				<Loading />
			</div>
		);
	return (
		<div
			className='chat-message-info-container'
			style={{
				height: "calc(100vh - 10px - 70px - 10px - " + chatInputHeight + " - 30px - 60px)",
			}}
		>
			<div className='chat-message-info-title'>
				<button className='chat-message-info-close-btn' onClick={() => setMessageInfo(false)}>
					<FaTimes />
				</button>
				<p>Message Information</p>
			</div>
			<p>
				<b>Date Sent: </b>
				{date}
			</p>
			<p className='chat-message-info-read-by-title'>
				<b>Read By: </b>
				{messageInfo.read_by.length === 0 ? "No one has read this message yet." : null}
			</p>
			{!readByProfiles ? null : (
				<div className='chat-message-info-read-by-container'>
					{readByProfiles.map((user, index) => (
						<div className='chat-message-info-read-by-item' key={index}>
							{user.profilePicture ? <img src={user.profilePicture} alt='' /> : null}
							<div className='chat-message-info-read-by-item-names'>
								<p>{user.nickname}</p>
								<p>@{user.username}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
