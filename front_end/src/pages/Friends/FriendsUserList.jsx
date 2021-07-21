// Packages
import { FaSearch } from "react-icons/fa";

// Components
import { Loading } from "../../components/Loading/Loading";
import { UserItem } from "../../components/UserItem/UserItem";
import { Input } from "../../components/Input/Input";

// Logic
import { FriendsUserListLogic } from "./FriendsUserListLogic";

// Context

// Styles
import "./FriendsUserList.css";
import { useEffect } from "react";

// Assets

export const FriendsUserList = () => {
	const { isMounted, loading, searchValue, changeSearchValue, filteredFriendsList, getFriends } = FriendsUserListLogic();

	useEffect(() => {
		isMounted.current = true;
		getFriends();
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<div className='friends-list-container'>
				<div className='friends-list'>
					<div className='friends-list-search-bar'>
						<Input
							value={searchValue}
							onChange={changeSearchValue}
							label={"Search for Friends"}
							icon={FaSearch}
							autocomplete={"off"}
						></Input>
					</div>

					<div className='friends-list-items-container'>
						{filteredFriendsList.map((user, index) => (
							<UserItem key={index} user={user} isFriend={false} />
						))}
					</div>
				</div>
			</div>
		);
	}
};
