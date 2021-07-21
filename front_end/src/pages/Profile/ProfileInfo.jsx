// Packages
import { FaUserEdit } from "react-icons/fa";

// Components

// Logic
import { ProfileInfoLogic } from "./ProfileInfoLogic";

// Context

// Styles
import "../Pages.css";
import "./ProfileInfo.css";

// Assets

export const ProfileInfo = ({ user }) => {
	const { compatibilityValueClassName } = ProfileInfoLogic();

	return (
		<div className='profile-info'>
			<div className='profile-info-more-top-info-container'>
				{user.bio === undefined ? null : (
					<div className='profile-info-more-top-info profile-info-bio'>
						<p>{user.bio}</p>
					</div>
				)}

				{user.compatibility === undefined ? null : (
					<div className='profile-info-more-top-info profile-info-compatibility'>
						<p className='profile-info-compatibility-label'>Compatibility</p>
						<p className={compatibilityValueClassName(user.compatibility)}>{user.compatibility}%</p>
					</div>
				)}

				<div className='profile-info-add-btn'>
					<FaUserEdit />
				</div>
			</div>

			<div className='profile-info-info-container'>
				{user.description === undefined || user.description.length === 0 ? null : (
					<div className='profile-info-description'>
						{user.description.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
				)}

				<div className='profile-info-dates'>
					<p>Born: 03/08/2001</p>
					<p>Joined: 07/07/2021</p>
				</div>
			</div>
		</div>
	);
};
