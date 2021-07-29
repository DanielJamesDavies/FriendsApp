// Packages
import { FaChevronLeft, FaPlus, FaTimes } from "react-icons/fa";

// Components

// Logic
import { InterestLogic } from "./InterestLogic";

// Context

// Styles
import "./Interest.css";

// Assets

export const Interest = ({ interest, setInterest, onCloseInterestList }) => {
	const { addInterest } = InterestLogic();

	return (
		<>
			<div className='interest'>
				<div className='interest-title'>
					<button className='interest-btn interest-back-btn' onClick={() => setInterest(false)}>
						<FaChevronLeft />
					</button>
					<div className='interest-name'>{interest.name}</div>
					<button className='interest-btn interest-add-btn' onClick={() => addInterest(interest, onCloseInterestList)}>
						<FaPlus />
					</button>
					<button className='interest-btn interest-close-btn' onClick={onCloseInterestList}>
						<FaTimes />
					</button>
				</div>

				{!interest.banner ? null : <img src={interest.banner} className='interest-banner' alt='' />}

				<div className='interest-description'>
					{interest.description.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>
			</div>

			<div className='interest-background' onClick={onCloseInterestList} />
		</>
	);
};
