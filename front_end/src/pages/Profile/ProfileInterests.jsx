// Packages
import { useHistory } from "react-router-dom";

// Components
import { InterestItem } from "../../components/InterestItem/InterestItem";

// Logic

// Context

// Styles
import "./ProfileInterests.css";

// Assets

export const ProfileInterests = ({ profile }) => {
	const history = useHistory();

	return (
		<div className='profile-interests'>
			<div className='profile-interests-title'>
				<h2>Interests</h2>
			</div>
			<div className='profile-interests-find-btn' onClick={() => history.push("/interests/")}>
				Find New Interests
			</div>
			<div className='profile-interests-container'>
				{profile.interests.map((interest, index) => (
					<InterestItem key={index} interest={interest} onItemClick={() => history.push("/interests/" + interest._id)} />
				))}
			</div>
		</div>
	);
};
