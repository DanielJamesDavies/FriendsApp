// Packages
import { useEffect } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";

// Components
import { Loading } from "../Loading/Loading";
import { Input } from "../Input/Input";
import { InterestItem } from "../InterestItem/InterestItem";

// Logic
import { InterestListLogic } from "./InterestListLogic";

// Context

// Styles
import "./InterestList.css";

// Assets

export const InterestList = ({ onCloseInterestList, setInterest }) => {
	const { isMounted, searchValue, changeSearchValue, filteredInterests, getInterests } = InterestListLogic();

	useEffect(() => {
		isMounted.current = true;
		getInterests();
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='interest-list'>
			<div className='interest-list-title'>Interests</div>
			<button className='interest-list-close-btn' onClick={onCloseInterestList}>
				<FaTimes />
			</button>

			<div className='interest-list-search-bar'>
				<Input value={searchValue} onChange={changeSearchValue} label={"Search for Interests"} icon={FaSearch} autocomplete={"off"}></Input>
			</div>

			{!filteredInterests ? (
				<Loading />
			) : (
				<div className='interest-list-items-container'>
					{filteredInterests.map((interest, index) => (
						<InterestItem interest={interest} key={index} onItemClick={(intrst) => setInterest(intrst)} />
					))}
				</div>
			)}
		</div>
	);
};
