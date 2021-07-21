// Packages
import { FaUserEdit } from "react-icons/fa";

// Components

// Logic
import { ProfileTopLogic } from "./ProfileTopLogic";

// Context

// Styles
import "../Pages.css";
import "./ProfileTop.css";

// Assets

export const ProfileTop = ({ user }) => {
	const { compatibilityValueClassName } = ProfileTopLogic();

	return (
		<div className='profile-top'>
			<div className='profile-top-banner'>
				<img src={user.banner} alt='' />
			</div>

			<div className='profile-top-info-container'>
				<div className='profile-top-profile-picture'>
					{user.profilePicture ? (
						<img src={user.profilePicture} alt='' />
					) : (
						<svg height='70' width='70'>
							<circle cx='35' cy='35' r='35' />
						</svg>
					)}
				</div>

				<div className='profile-top-info profile-top-names'>
					<p className='users-list-item-nickname'>{user.nickname}</p>
					<p className='users-list-item-username'>@{user.username}</p>
				</div>

				{user.bio === undefined ? null : (
					<div className='profile-top-info profile-top-bio'>
						<p>{user.bio}</p>
					</div>
				)}

				{user.compatibility === undefined ? null : (
					<div className='profile-top-info profile-top-compatibility'>
						<p className='profile-top-compatibility-label'>Compatibility</p>
						<p className={compatibilityValueClassName(user.compatibility)}>{user.compatibility}%</p>
					</div>
				)}

				<div className='profile-top-add-btn'>
					<FaUserEdit />
				</div>
			</div>
		</div>
	);
};
