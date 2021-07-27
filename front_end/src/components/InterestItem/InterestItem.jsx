// Packages
import { useEffect } from "react";

// Components

// Logic
import { InterestItemLogic } from "./InterestItemLogic";

// Context

// Styles
import "./InterestItem.css";

// Assets

export const InterestItem = ({ interest, buttonOnClick, buttonLabel }) => {
	const { isMounted } = InterestItemLogic();

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className={interest.banner ? "interest-item interest-item-with-banner" : "interest-item"}>
			{interest.banner === undefined ? null : (
				<div className='interest-item-banner-container'>
					<div className='interest-item-banner-hover-filter' />
					<img src={interest.banner} className='interest-item-banner' alt='' />
				</div>
			)}

			<div className='interest-item-info-container'>
				<p className='interest-item-name'>{interest.name}</p>
				{!buttonOnClick || !buttonLabel ? null : (
					<button className='interest-item-btn' onClick={buttonOnClick}>
						{buttonLabel}
					</button>
				)}
			</div>
		</div>
	);
};
