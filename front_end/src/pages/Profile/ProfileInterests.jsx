// Packages

// Components
import { InterestItem } from "../../components/InterestItem/InterestItem";

// Logic
import { ProfileInterestsLogic } from "./ProfileInterestsLogic";

// Context

// Styles
import "./ProfileInterests.css";

// Assets

export const ProfileInterests = ({ profile }) => {
	const { history, showAllInterests, setShowAllInterests } = ProfileInterestsLogic();

	return (
		<div className='profile-interests'>
			<div className='profile-interests-title'>
				<h2>Interests</h2>
			</div>
			<div className='profile-interests-container'>
				{profile.interests.map((interest, index) =>
					showAllInterests || index < 8 ? (
						<InterestItem key={index} interest={interest} onItemClick={() => history.push("/interests/" + interest._id)} />
					) : null
				)}
			</div>

			{profile.interests.length <= 8 ? null : (
				<div className='profile-show-interests-btn-container'>
					{showAllInterests ? (
						<button onClick={() => setShowAllInterests(false)}>Show Less</button>
					) : (
						<button onClick={() => setShowAllInterests(true)}>Show More</button>
					)}
				</div>
			)}
		</div>
	);
};
