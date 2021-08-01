// Packages

// Components
import { InterestPlaceholderItem } from "../../components/InterestPlaceholderItem/InterestPlaceholderItem";

// Logic

// Context

// Styles
import "./ProfileInterests.css";

// Assets

export const ProfileInterestsPlaceholder = ({ interests }) => {
	return (
		<div className='profile-interests'>
			<div className='profile-interests-title'>
				<h2>Interests</h2>
			</div>
			<div className='profile-interests-container'>
				{interests.map((interest, index) => (index < 8 ? <InterestPlaceholderItem key={index} /> : null))}
			</div>

			{interests.length <= 8 ? null : (
				<div className='profile-show-interests-btn-container'>
					<button>Show More</button>
				</div>
			)}
		</div>
	);
};
