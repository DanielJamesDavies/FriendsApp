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

export const ProfileInfo = ({ profile }) => {
	const { compatibilityValueClassName } = ProfileInfoLogic();

	return (
		<div className='profile-info'>
			<div className='profile-info-more-top-info-container'>
				{profile.briefDescription === undefined ? null : (
					<div className='profile-info-more-top-info profile-info-briefDescription'>
						<p>{profile.briefDescription}</p>
					</div>
				)}

				{profile.compatibility === undefined ? null : (
					<div className='profile-info-more-top-info profile-info-compatibility'>
						<p className='profile-info-compatibility-label'>Compatibility</p>
						<p className={compatibilityValueClassName(profile.compatibility)}>{profile.compatibility}%</p>
					</div>
				)}

				<div className='profile-info-add-btn'>
					<FaUserEdit />
				</div>
			</div>

			<div className='profile-info-info-container'>
				{profile.fullDescription === undefined || profile.fullDescription.length === 0 ? null : (
					<div className='profile-info-full-description'>
						{profile.fullDescription.map((paragraph, index) => (
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
