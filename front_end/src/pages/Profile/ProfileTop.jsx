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

export const ProfileTop = ({ profile }) => {
	const { compatibilityValueClassName } = ProfileTopLogic();

	return (
		<div className='profile-top'>
			<div className='profile-top-banner'>
				<img src={profile.banner} alt='' />
			</div>

			<div className='profile-top-info-container'>
				<div className='profile-top-profile-picture'>
					{profile.profilePicture ? (
						<img src={profile.profilePicture} alt='' />
					) : (
						<svg height='70' width='70'>
							<circle cx='35' cy='35' r='35' />
						</svg>
					)}
				</div>

				<div className='profile-top-info profile-top-names'>
					<p>{profile.nickname}</p>
					<p>@{profile.username}</p>
				</div>

				{profile.bio === undefined ? null : (
					<div className='profile-top-info profile-top-bio'>
						<p>{profile.bio}</p>
					</div>
				)}

				{profile.compatibility === undefined ? null : (
					<div className='profile-top-info profile-top-compatibility'>
						<p className='profile-top-compatibility-label'>Compatibility</p>
						<p className={compatibilityValueClassName(profile.compatibility)}>{profile.compatibility}%</p>
					</div>
				)}

				<div className='profile-top-add-btn'>
					<FaUserEdit />
				</div>
			</div>
		</div>
	);
};
