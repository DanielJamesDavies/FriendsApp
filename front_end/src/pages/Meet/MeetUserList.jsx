// Packages
import { useContext } from "react";
import { FaSearch } from "react-icons/fa";

// Components
import { Loading } from "../../components/Loading/Loading";
import { UserItem } from "../../components/UserItem/UserItem";
import { Input } from "../../components/Input/Input";
import { FaPlus } from "react-icons/fa";

// Logic
import { MeetUserListLogic } from "./MeetUserListLogic";

// Context
import { UserContext } from "../../context/UserContext";

// Styles
import "./MeetUserList.css";
import { useEffect } from "react";

// Assets

export const MeetUserList = () => {
	const { isMounted, loading, searchValue, changeSearchValue, filteredUsersList, getUsers } = MeetUserListLogic();
	const { id } = useContext(UserContext);

	useEffect(() => {
		isMounted.current = true;
		getUsers();
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<div className='users-list-container'>
				<div className='users-list'>
					<div className='users-list-search-bar'>
						<Input
							value={searchValue}
							onChange={changeSearchValue}
							label={"Search for Users"}
							icon={FaSearch}
							autocomplete={"off"}
						></Input>
					</div>

					<div className='users-list-items-container'>
						{filteredUsersList.map((user, index) => (
							<UserItem
								key={index}
								user={user}
								isFriend={false}
								notificationIcon={FaPlus}
								notificationCondition={user.friendships && user.friendships.requests.sent.includes(id)}
								notificationColour={"green"}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
};
