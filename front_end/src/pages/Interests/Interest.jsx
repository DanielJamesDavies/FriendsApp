// Packages
import { useEffect } from "react";
import { FaChevronLeft, FaPlus, FaTimes } from "react-icons/fa";

// Components

// Logic
import { InterestLogic } from "./InterestLogic";

// Context

// Styles
import "../Pages.css";
import "./Interest.css";

// Assets

export const Interest = ({ interest, setInterest, userInterests, setUserInterests }) => {
	const { isMounted, addInterestToProfile, removeInterestFromProfile } = InterestLogic();

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	if (!interest) return null;
	return (
		<>
			<div className='interest-container'>
				{!interest.banner ? null : (
					<div className='interest-banner'>
						<button className='interest-back-btn' onClick={() => setInterest(false)}>
							<FaChevronLeft />
						</button>
						<img src={interest.banner} alt='' />
					</div>
				)}
				<div className='interest-name'>{interest.name}</div>

				<div className='interest-description'>
					{interest.description.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>

				{!userInterests.includes(interest._id) ? (
					<div className='interest-btn-container'>
						<p>Add as one of your interests</p>
						<button className='interest-add-btn' onClick={() => addInterestToProfile(interest, setUserInterests)}>
							<FaPlus />
						</button>
					</div>
				) : (
					<div className='interest-btn-container'>
						<p>Remove from the list of your interests</p>
						<button className='interest-remove-btn' onClick={() => removeInterestFromProfile(interest, setUserInterests)}>
							<FaTimes />
						</button>
					</div>
				)}

				<div className='interest-btn-container'>
					<p>Add as one of your group's interests</p>
					<button className='interest-add-btn' onClick={() => {}}>
						<FaPlus />
					</button>
				</div>
			</div>

			<div className='interest-container-background' onClick={() => setInterest(false)} />
		</>
	);
};
