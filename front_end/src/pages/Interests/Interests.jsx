// Packages

// Components
import { Loading } from "../../components/Loading/Loading";
import { InterestsList } from "./InterestsList";
import { Interest } from "./Interest";

// Logic
import { InterestsLogic } from "./InterestsLogic";

// Context

// Styles
import "../Pages.css";
import "./Interests.css";
import { useEffect } from "react";

// Assets

export const Interests = (props) => {
	const { isMounted, loading, interest, setInterest, userInterests, setUserInterests, getInterest, getUserInterests } = InterestsLogic();

	useEffect(() => {
		isMounted.current = true;
		if (props.match.params.id) getInterest(props.match.params.id);
		getUserInterests();
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='page interests-page'>
			<div className='page-title'>
				<h1>Interests</h1>
			</div>

			{loading ? (
				<Loading />
			) : (
				<>
					<InterestsList setInterest={setInterest} />
					<Interest interest={interest} setInterest={setInterest} userInterests={userInterests} setUserInterests={setUserInterests} />
				</>
			)}
		</div>
	);
};
