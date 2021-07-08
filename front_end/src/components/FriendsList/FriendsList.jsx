// Packages

// Components
import { UserItem } from "../UserItem/UserItem";
import { Input } from "../Input/Input";

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
                    <Input
                        value={searchValue}
                        onChange={changeSearchValue}
                        label={"Search for Friends"}
                    ></Input>
                </div>

                <div className="friends-list-items-container">

                    {filteredFriendsList.map((friend, index) => (
                        <UserItem key={index} user={friend} isFriend={true} />
                    ))}

                </div>


            </div>
        </div>
    )
}