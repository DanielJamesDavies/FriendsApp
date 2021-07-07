// Packages
import * as fa from "react-icons/fa";

// Components

// Logic
import { UserInfoLogic } from './UserInfoLogic';

// Context

// Styles
import '../Pages.css';
import './UserInfo.css';

// Assets


export const UserInfo = ({ user }) => {
    const { compatibilityValueClassName } = UserInfoLogic();

    return (
        <div className="user-info">

            <div className="user-info-more-top-info-container">

                {user.shortDescription === undefined ? null :
                    <div className="user-info-more-top-info user-info-short-description">
                        <p>{user.shortDescription}</p>
                    </div>
                }

                {user.compatibility === undefined ? null :
                    <div className="user-info-more-top-info user-info-compatibility">
                        <p className="user-info-compatibility-label">Compatibility</p>
                        <p className={compatibilityValueClassName(user.compatibility)}>
                            {user.compatibility}%
                        </p>
                    </div>
                }

                <div className="user-info-add-btn">
                    <fa.FaUserPlus />
                </div>

            </div>

            <div className="user-info-info-container">

                {user.description === undefined || user.description.length === 0 ? null :
                    <div className="user-info-description">
                        {user.description.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                }

                <div className="user-info-dates">
                    <p>Born: 03/08/2001</p>
                    <p>Joined: 07/07/2021</p>
                </div>

            </div>

        </div>
    )
}