// Packages
import * as fa from "react-icons/fa";

// Components
import { FriendsListItem } from "./FriendsListItem";

// Logic
import { FriendsListLogic } from "./FriendsListLogic";

// Context

// Styles
import './FriendsList.css';

// Assets


export const FriendsList = () => {
    const { searchValue, changeSearchValue, filteredFriendsList } = FriendsListLogic();

    return (
        <div className="friends-list-container">
            <div className="friends-list">

                <div className="friends-list-search-bar">
                    <input
                        placeholder="Search for Friends"
                        value={searchValue}
                        onChange={changeSearchValue}
                    >
                    </input>
                </div>

                <div className="friends-list-items-container">

                    {filteredFriendsList.map((friend, index) => (
                        <FriendsListItem key={index} friend={friend} />
                    ))}

                </div>


            </div>
        </div>
    )
}