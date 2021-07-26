// Packages
import { useState, useRef } from "react";

// Components

// Logic

// Context

// Styles

// Assets

export const ChatEditLogic = ({ chat }) => {
	const [icon, setIcon] = useState(chat.icon);
	const [name, setName] = useState(chat.name);
	const [participants, setParticipants] = useState(
		chat.participants.map((participant) => {
			return participant._id;
		})
	);
	const [banner, setBanner] = useState(chat.banner);
	const editBannerInputRef = useRef();

	console.log(participants);
	function addParticipant(user_id) {
		var newParticipants = JSON.parse(JSON.stringify(participants));
		newParticipants.push(user_id);
		setParticipants(newParticipants);
	}

	function saveChat() {
		var newChat = { name: name, participants: participants, banner: banner };
	}

	return { icon, setIcon, name, setName, participants, editBannerInputRef, addParticipant, saveChat };
};
