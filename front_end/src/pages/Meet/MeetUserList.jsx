// Packages
import { FaSearch } from "react-icons/fa";

// Components
import { Loading } from "../../components/Loading/Loading";
import { UserItem } from "../../components/UserItem/UserItem";
import { Input } from "../../components/Input/Input";

// Logic
import { MeetUserListLogic } from "./MeetUserListLogic";

// Context

// Styles
import "./MeetUserList.css";
import { useEffect } from "react";

// Assets

export const MeetUserList = () => {
	const { loading, searchValue, changeSearchValue, filteredUsersList, getUsers } = MeetUserListLogic();

	useEffect(() => {
		getUsers();
	}, []);

	if (loading) {
		return <Loading />;
	} else {
		return (
			<div className='users-list-container'>
				<div className='users-list'>
					<div className='users-list-search-bar'>
						<Input value={searchValue} onChange={changeSearchValue} label={"Search for Users"} icon={FaSearch}></Input>
					</div>

					<div className='users-list-items-container'>
						{filteredUsersList.map((user, index) => (
							<UserItem key={index} user={user} isFriend={false} />
						))}
					</div>
				</div>
			</div>
		);
	}
};
