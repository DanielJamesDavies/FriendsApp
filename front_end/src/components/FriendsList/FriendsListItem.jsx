// Packages

// Components

// Logic
import { FriendsListItemLogic } from './FriendsListItemLogic';

// Context

// Styles
import './FriendsListItem.css';

// Assets


export const FriendsListItem = ({ friend }) => {
    const { toUser } = FriendsListItemLogic();

    return (
        <div className="friends-list-item-container">

            <div
                className={friend.backgroundImage !== undefined ?
                    "friends-list-item friends-list-item-with-background-image" :
                    "friends-list-item friends-list-item-without-background-image"
                }
                onClick={() => toUser(friend.username)}
            >

                {friend.backgroundImage === undefined ? null :
                    <div className="friends-list-item-background-container">
                        <div className="friends-list-item-with-background-image-hover-filter" />
                        <img src={friend.backgroundImage}
                            className="friends-list-item-background"
                            alt=""
                        />
                    </div>
                }

                <div className="friends-list-item-foreground">

                    <div className="friends-list-item-profile-picture">
                        <svg height="50" width="50">
                            <circle cx="25" cy="25" r="25" />
                        </svg>
                    </div>

                    <div className="friends-list-item-names">
                        <p className="friends-list-item-nickname">{friend.nickname}</p>
                        <p className="friends-list-item-username">@{friend.username}</p>
                        <p className={friend.status !== "Offline" ? "friends-list-item-status friends-list-item-status-online" : "friends-list-item-status friends-list-item-status-offline"}>
                            {friend.status}
                        </p>
                    </div>

                </div>

            </div>

            <div className="friends-list-item-divider"></div>

        </div>
    )
}