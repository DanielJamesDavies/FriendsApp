// Packages

// Components
import { InterestItem } from "../../components/InterestItem/InterestItem";

// Logic

// Context

// Styles
import "./ProfileInterests.css";

// Assets

export const ProfileInterests = ({ profile }) => {
	return (
		<div className='profile-interests'>
			<div className='profile-interests-title'>
				<h2>Interests</h2>
			</div>
			<div className='profile-interests-container'>
				{profile.interests.map((interest, index) => (
					<InterestItem key={index} interest={interest} />
				))}
			</div>
		</div>
	);
};
