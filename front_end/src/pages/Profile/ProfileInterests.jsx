// Packages

// Components
import { InterestItem } from "../../components/InterestItem/InterestItem";
import { DragDropContainer } from "../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../components/DragDropItem/DragDropItem";

// Logic
import { ProfileInterestsLogic } from "./ProfileInterestsLogic";

// Context

// Styles
import "./ProfileInterests.css";

// Assets

export const ProfileInterests = ({ interests, setInterests }) => {
	const { history, showAllInterests, setShowAllInterests, isRearranging, toggleIsRearranging, onInterestDrag } = ProfileInterestsLogic({
		setInterests,
	});

	return (
		<div className='profile-interests'>
			<div className='profile-interests-top-bar'>
				<div className='profile-interests-title'>
					<h2>Interests</h2>
				</div>
				<div className='profile-interests-edit' onClick={toggleIsRearranging}>
					{!isRearranging ? <p>Rearrange</p> : <p>Stop Rearranging</p>}
				</div>
			</div>

			{!isRearranging ? (
				<div className='profile-interests-container'>
					{interests.map((interest, index) =>
						showAllInterests || index < 8 ? (
							<InterestItem key={index} interest={interest} onItemClick={() => history.push("/interests/" + interest._id)} />
						) : null
					)}
				</div>
			) : (
				<DragDropContainer className='profile-interests-container' itemsAreInline={true} onDropItem={onInterestDrag}>
					{interests.map((interest, index) =>
						showAllInterests || index < 8 ? (
							<DragDropItem key={index} index={index}>
								<InterestItem interest={interest} onItemClick={() => history.push("/interests/" + interest._id)} />
							</DragDropItem>
						) : null
					)}
				</DragDropContainer>
			)}

			{interests.length <= 8 ? null : (
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
