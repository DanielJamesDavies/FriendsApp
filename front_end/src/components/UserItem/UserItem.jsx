// Packages

// Components

// Logic
import { UserItemLogic } from "./UserItemLogic";

// Context

// Styles
import "./UserItem.css";

// Assets

export const UserItem = ({ user, isFriend, notificationIcon, notificationCondition, notificationColour }) => {
	const { toUser, compatibilityValueClassName } = UserItemLogic();
	if (notificationIcon) var DynamicNotificationIcon = notificationIcon;

	return (
		<div className='user-item' onClick={() => toUser(user.username)}>
			<div className='user-item-notification-container'>
				{notificationCondition ? (
					<div
						className={
							notificationColour
								? "user-item-notification user-item-notification-colour-" + notificationColour
								: "user-item-notification"
						}
					>
						<DynamicNotificationIcon />
					</div>
				) : null}
			</div>
			<div className='user-item-profile-picture'>
				{user.profilePicture ? (
					<img src={user.profilePicture} alt='' />
				) : (
					<svg height='50' width='50'>
						<circle cx='25' cy='25' r='25' />
					</svg>
				)}
			</div>

			<div className='user-item-names'>
				<p className='user-item-nickname'>{user.nickname}</p>
				<p className='user-item-username'>@{user.username}</p>
			</div>

			<div className='user-item-second-info'>
				<p className='user-item-briefDescription'>{user.briefDescription}</p>

				{!isFriend ? null : (
					<p
						className={
							user.status !== "Offline" ? "user-item-status user-item-status-online" : "user-item-status user-item-status-offline"
						}
					>
						{user.status}
					</p>
				)}

				{isFriend || user.compatibility === undefined ? null : (
					<div className='user-item-compatibility'>
						<p className='user-item-compatibility-label'>
							Compatibility: <span className={compatibilityValueClassName(user.compatibility)}>{user.compatibility}%</span>
						</p>
					</div>
				)}
			</div>

			{user.banner === undefined ? null : (
				<div className='user-item-banner-container'>
					<div className='user-item-banner-hover-filter' />
					<img src={user.banner} className='user-item-banner' alt='' />
				</div>
			)}
		</div>
	);
};
