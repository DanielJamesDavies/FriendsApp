// Packages

// Components
import { UserFriendshipBtn } from "./UserFriendshipBtn";

// Logic
import { UserTopLogic } from "./UserTopLogic";

// Context

// Styles
import "../Pages.css";
import "./UserTop.css";

// Assets

export const UserTop = ({ user, getUser }) => {
	const { compatibilityValueClassName } = UserTopLogic();

	return (
		<div className='user-top'>
			<div className='user-top-banner'>
				<img src={user.banner} alt='' />
			</div>

			<div className='user-top-info-container'>
				<div className='user-top-profile-picture'>
					{user.profilePicture ? (
						<img src={user.profilePicture} alt='' />
					) : (
						<svg height='70' width='70'>
							<circle cx='35' cy='35' r='35' />
						</svg>
					)}
				</div>

				<div className='user-top-info user-top-names'>
					<p className='users-list-item-nickname'>{user.nickname}</p>
					<p className='users-list-item-username'>@{user.username}</p>
				</div>

				{user.briefDescription === undefined ? null : (
					<div className='user-top-info user-top-briefDescription'>
						<p>{user.briefDescription}</p>
					</div>
				)}

				{user.compatibility === undefined ? null : (
					<div className='user-top-info user-top-compatibility'>
						<p className='user-top-compatibility-label'>Compatibility</p>
						<p className={compatibilityValueClassName(user.compatibility)}>{user.compatibility}%</p>
					</div>
				)}

				<UserFriendshipBtn
					user_id={user._id}
					username={user.username}
					friendships={user.friendships}
					getUser={getUser}
					className={"user-top-friendships-btn"}
				/>
			</div>
		</div>
	);
};
