// Packages
import * as fa from "react-icons/fa";

// Components

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
                        <div key={index} className="friends-list-item-container">

                            <div
                                className={friend.backgroundImage !== undefined ?
                                    "friends-list-item friends-list-item-with-background-image" :
                                    "friends-list-item"
                                }
                            >

                                {friend.backgroundImage === undefined ? null :
                                    <div className="friends-list-item-background-container">
                                        <img src={friend.backgroundImage}
                                            className="friends-list-item-background"
                                            alt=""
                                        />
                                    </div>
                                }

                                <div className="friends-list-item-foreground">

                                    <div className="friends-list-item-profile-picture">
                                        <svg height="50" width="50">
                                            <circle cx="25" cy="25" r="25" fill="#0077ff" />
                                        </svg>
                                    </div>

                                    <div className="friends-list-item-names">
                                        <p className="friends-list-item-nickname">{friend.nickname}</p>
                                        <p className="friends-list-item-username">{friend.username}</p>
                                        <p className="friends-list-item-status">
                                            <fa.FaClock />
                                            {friend.status}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="friends-list-item-divider"></div>

                        </div>
                    ))}

                </div>


            </div>
        </div>
    )
}