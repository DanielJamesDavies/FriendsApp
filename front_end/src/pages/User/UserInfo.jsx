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
				{user.briefDescription === undefined ? null : (
					<div className='user-info-more-top-info user-info-briefDescription'>
						<p>{user.briefDescription}</p>
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
				{user.fullDescription === undefined || user.fullDescription.length === 0 ? null : (
					<div className='user-info-full-description'>
						{user.fullDescription.map((paragraph, index) => (
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
