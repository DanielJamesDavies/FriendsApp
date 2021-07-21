// Packages

// Components
import { UserFriendshipBtn } from "./UserFriendshipBtn";

// Logic
import { UserInfoLogic } from "./UserInfoLogic";

// Context

// Styles
import "../Pages.css";
import "./UserInfo.css";

// Assets

export const UserInfo = ({ user }) => {
	const { compatibilityValueClassName } = UserInfoLogic();

	return (
		<div className='user-info'>
			<div className='user-info-more-top-info-container'>
				{user.bio === undefined ? null : (
					<div className='user-info-more-top-info user-info-bio'>
						<p>{user.bio}</p>
					</div>
				)}

				{user.compatibility === undefined ? null : (
					<div className='user-info-more-top-info user-info-compatibility'>
						<p className='user-info-compatibility-label'>Compatibility</p>
						<p className={compatibilityValueClassName(user.compatibility)}>{user.compatibility}%</p>
					</div>
				)}

				<UserFriendshipBtn friendships={user.friendships} className={"user-info-friendships-btn"} />
			</div>

			<div className='user-info-info-container'>
				{user.description === undefined || user.description.length === 0 ? null : (
					<div className='user-info-description'>
						{user.description.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
				)}

				<div className='user-info-dates'>
					<p>Born: 03/08/2001</p>
					<p>Joined: 07/07/2021</p>
				</div>
			</div>
		</div>
	);
};
