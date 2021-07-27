// Packages
import { FaChevronLeft } from "react-icons/fa";

// Components
import { Input } from "../../../components/Input/Input";

// Logic
import { ChatEditLogic } from "./ChatEditLogic";

// Context

// Styles
import "./ChatEdit.css";

// Assets

export const ChatEdit = ({ chat, setIsEditingChat }) => {
	const { name, setName } = ChatEditLogic({ chat });

	return (
		<div className='chat-edit-container'>
			<div className='chat-edit-top'>
				<button className='chat-edit-top-back-btn' onClick={() => setIsEditingChat(false)}>
					<FaChevronLeft />
				</button>
				<h1>Edit Chat</h1>
			</div>
			<div className='chat-edit-inputs-container'>
				<div className='chat-edit-icon-container'>
					<p className='chat-edit-icon-title'>Icon</p>
					{!chat.icon ? null : <img src={chat.icon} alt='' />}
				</div>

				<div className='chat-edit-input-container'>
					<Input value={name} onChange={(e) => setName(e.target.value)} label={"Chat Name"} type={"chat-name"} id={"chat-name"}></Input>
				</div>

				<div className='chat-edit-participants-contaner'>
					<p className='chat-edit-participants-title'>Participants ({chat.participants.length})</p>
					{chat.participants.map((participant, index) => (
						<div className='chat-edit-participant-item' key={index}>
							{!participant.profilePicture ? null : (
								<img className='chat-edit-participant-item-profile-picture' src={participant.profilePicture} alt='' />
							)}
							<div className='chat-edit-participant-item-names'>
								<p className='chat-edit-participant-item-nickname'>{participant.nickname}</p>
								<p className='chat-edit-participant-item-username'>@{participant.username}</p>
							</div>
						</div>
					))}
				</div>

				<div className='chat-edit-banner-container'>
					<p className='chat-edit-banner-title'>Banner</p>
					{!chat.banner ? null : <img src={chat.banner} alt='' />}
				</div>
			</div>
		</div>
	);
};
