// Packages

// Components
import { Interests } from "../../components/Interests/Interests";
import { InterestItem } from "../../components/InterestItem/InterestItem";

// Logic
import { ProfileInterestsLogic } from "./ProfileInterestsLogic";

// Context

// Styles
import "./ProfileInterests.css";

// Assets

export const ProfileInterests = ({ profile }) => {
	const { findInterestsOpen, setFindInterestsOpen } = ProfileInterestsLogic();

	return (
		<div className='profile-interests'>
			<div className='profile-interests-title'>
				<h2>Interests</h2>
			</div>
			<div className='profile-interests-find-btn' onClick={() => setFindInterestsOpen(true)}>
				Find New Interests
			</div>
			{!findInterestsOpen ? null : <Interests onCloseInterestList={() => setFindInterestsOpen(false)} />}
			<div className='profile-interests-container'>
				{profile.interests.map((interest, index) => (
					<InterestItem key={index} interest={interest} />
				))}
			</div>
		</div>
	);
};
