// Packages

// Components
import { UserItem } from "../../components/UserItem/UserItem";

// Logic
import { MeetUserListLogic } from "./MeetUserListLogic";

// Context

// Styles
import './MeetUserList.css';

// Assets


export const MeetUserList = () => {
    const { searchValue, changeSearchValue, filteredUsersList } = MeetUserListLogic();

    return (
        <div className="users-list-container">
            <div className="users-list">

                <div className="users-list-search-bar">
                    <input
                        placeholder="Search for Users"
                        value={searchValue}
                        onChange={changeSearchValue}
                    >
                    </input>
                </div>

                <div className="users-list-items-container">

                    {filteredUsersList.map((user, index) => (
                        <UserItem key={index} user={user} isFriend={false} />
                    ))}

                </div>


            </div>
        </div>
    )
}