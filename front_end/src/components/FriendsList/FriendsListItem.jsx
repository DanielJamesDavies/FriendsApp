// Packages
import * as fa from "react-icons/fa";

// Components

// Logic

// Context

// Styles
import './FriendsListItem.css';

// Assets


export const FriendsListItem = ({ friend }) => {

    return (
        <div className="friends-list-item-container">

            <div
                className={friend.backgroundImage !== undefined ?
                    "friends-list-item friends-list-item-with-background-image" :
                    "friends-list-item friends-list-item-without-background-image"
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
                        <p className={friend.status !== "Offline" ? "friends-list-item-status friends-list-item-status-online" : "friends-list-item-status friends-list-item-status-offline"}>
                            {/* <fa.FaClock /> */}
                            {friend.status}
                        </p>
                    </div>

                </div>

            </div>

            <div className="friends-list-item-divider"></div>

        </div>
    )
}