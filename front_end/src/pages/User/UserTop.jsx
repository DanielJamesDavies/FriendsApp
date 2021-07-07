// Packages
import * as fa from "react-icons/fa";

// Components

// Logic
import { UserTopLogic } from './UserTopLogic';

// Context

// Styles
import '../Pages.css';
import './UserTop.css';

// Assets


export const UserTop = ({ user }) => {
    const { compatibilityValueClassName } = UserTopLogic();

    return (
        <div className="user-top">
            <div className="user-top-background-image">
                <img src={user.backgroundImage} alt="" />
            </div>

            <div className="user-top-info-container">

                <div className="user-top-profile-picture">
                    <svg height="70" width="70">
                        <circle cx="35" cy="35" r="35" />
                    </svg>
                </div>

                <div className="user-top-info user-top-names">
                    <p className="users-list-item-nickname">{user.nickname}</p>
                    <p className="users-list-item-username">@{user.username}</p>
                </div>

                {user.shortDescription === undefined ? null :
                    <div className="user-top-info user-top-short-description">
                        <p>{user.shortDescription}</p>
                    </div>
                }

                {user.compatibility === undefined ? null :
                    <div className="user-top-info user-top-compatibility">
                        <p className="user-top-compatibility-label">Compatibility</p>
                        <p className={compatibilityValueClassName(user.compatibility)}>
                            {user.compatibility}%
                        </p>
                    </div>
                }

                <div className="user-top-add-btn">
                    <fa.FaUserPlus />
                </div>

            </div>
        </div>
    )
}