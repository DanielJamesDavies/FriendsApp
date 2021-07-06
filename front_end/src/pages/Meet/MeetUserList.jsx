// Packages

// Components
import { MeetUserListItem } from "./MeetUserListItem";

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
                        <MeetUserListItem key={index} user={user} />
                    ))}

                </div>


            </div>
        </div>
    )
}