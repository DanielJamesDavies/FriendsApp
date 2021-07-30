// Packages
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

// Components
import { Loading } from "../../components/Loading/Loading";
import { Input } from "../../components/Input/Input";
import { InterestItem } from "../../components/InterestItem/InterestItem";

// Logic
import { InterestsListLogic } from "./InterestsListLogic";

// Context

// Styles
import "../Pages.css";
import "./InterestsList.css";

// Assets

export const InterestsList = ({ setInterest }) => {
	const { isMounted, loading, filteredInterestsList, searchValue, getInterests, changeSearchValue, openInterest } = InterestsListLogic();

	useEffect(() => {
		isMounted.current = true;
		getInterests();
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<div className='interests-list-container'>
				<div className='interests-list-search-bar'>
					<Input
						value={searchValue}
						onChange={changeSearchValue}
						label={"Search for Interests"}
						icon={FaSearch}
						autocomplete={"off"}
					></Input>
				</div>

				<div className='interests-list-items-container'>
					{filteredInterestsList.map((interest, index) => (
						<InterestItem interest={interest} key={index} onItemClick={() => openInterest(interest, setInterest)} />
					))}
				</div>
			</div>
		);
	}
};
