// Packages
import { useEffect } from "react";

// Components
import { InterestList } from "./InterestList";
import { Interest } from "./Interest";

// Logic
import { InterestsLogic } from "./InterestsLogic";

// Context

// Styles
import "./Interests.css";

// Assets

export const Interests = ({ interest_id, onCloseInterestList }) => {
	const { isMounted, interest, setInterest, getInterest } = InterestsLogic();

	useEffect(() => {
		isMounted.current = true;
		if (interest_id) getInterest(interest_id);
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<div className='interests'>
				{!interest ? (
					<InterestList onCloseInterestList={onCloseInterestList} setInterest={setInterest} />
				) : (
					<Interest interest={interest} setInterest={setInterest} onCloseInterestList={onCloseInterestList} />
				)}
			</div>

			<div className='interests-background' onClick={onCloseInterestList} />
		</>
	);
};
