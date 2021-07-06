// Packages

// Components

// Logic
import { MeetUserListItemLogic } from './MeetUserListItemLogic';

// Context

// Styles
import './MeetUserListItem.css';

// Assets


export const MeetUserListItem = ({ user }) => {
    const { toUser, compatibilityValueClassName } = MeetUserListItemLogic();

    return (
        <div className="users-list-item-container">

            <div
                className={user.backgroundImage !== undefined ?
                    "users-list-item users-list-item-with-background-image" :
                    "users-list-item users-list-item-without-background-image"
                }
                onClick={() => toUser(user.username)}
            >

                {user.backgroundImage === undefined ? null :
                    <div className="users-list-item-background-container">
                        <div className="users-list-item-with-background-image-hover-filter" />
                        <img src={user.backgroundImage}
                            className="users-list-item-background"
                            alt=""
                        />
                    </div>
                }

                <div className="users-list-item-foreground">

                    <div className="users-list-item-profile-picture">
                        <svg height="50" width="50">
                            <circle cx="25" cy="25" r="25" />
                        </svg>
                    </div>

                    <div className="users-list-item-names">
                        <p className="users-list-item-nickname">{user.nickname}</p>
                        <p className="users-list-item-username">@{user.username}</p>
                    </div>

                    {user.compatibility === undefined ? null :
                        <div className="users-list-item-compatibility">
                            <p className="users-list-item-compatibility-label">Compatibility</p>
                            <p className={compatibilityValueClassName(user.compatibility)}>
                                {user.compatibility}%
                            </p>
                        </div>
                    }

                </div>

            </div>

            <div className="users-list-item-divider"></div>

        </div>
    )
}