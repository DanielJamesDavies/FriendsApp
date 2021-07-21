// Packages
import { useContext } from "react";
import { FaStar, FaTimes, FaUserClock, FaUserPlus } from "react-icons/fa";

// Components

// Logic
import { UserFriendshipBtnLogic } from "./UserFriendshipBtnLogic";

// Context
import { UserContext } from "../../context/UserContext";

// Styles
import "./UserFriendshipBtn.css";

// Assets

export const UserFriendshipBtn = ({ user_id, username, friendships, className, getUser }) => {
	const { sendFriendRequest, removeFriendRequest, addFavourite } = UserFriendshipBtnLogic();
	const { id, favouriteFriends } = useContext(UserContext);
	className += " user-friendship-btn";

	if (friendships.friends.includes(id)) {
		return (
			<>
				<div
					className={favouriteFriends.includes(user_id) ? className + " user-friendship-btn-favourited" : className}
					onClick={() => addFavourite(user_id, username, getUser)}
				>
					<FaStar />
				</div>
				<div className={className + " user-friendship-btn-remove"} onClick={() => removeFriendRequest(user_id, username, getUser)}>
					<FaTimes />
				</div>
			</>
		);
	}
	if (friendships.requests.received.includes(id)) {
		return (
			<div className={className + " user-friendship-btn-sent"} onClick={() => removeFriendRequest(user_id, username, getUser)}>
				<FaUserClock />
			</div>
		);
	}
	if (friendships.requests.sent.includes(id)) {
		return (
			<div className={className + " user-friendship-btn-received"} onClick={() => sendFriendRequest(user_id, username, getUser)}>
				<FaUserPlus />
			</div>
		);
	}
	return (
		<div className={className} onClick={() => sendFriendRequest(user_id, username, getUser)}>
			<FaUserPlus />
		</div>
	);
};
