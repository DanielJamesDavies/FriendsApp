// Packages
import * as fa from "react-icons/fa";

// Components

// Logic
import { UserGroupsLogic } from './UserGroupsLogic';

// Context

// Styles
import '../Pages.css';
import './UserGroups.css';

// Assets


export const UserGroups = ({ user }) => {

    return (
        <div className="user-groups">

            <div className="user-groups-container">

                <div className="user-group-item">
                    <img
                        className="user-group-item-image"
                        src={user.backgroundImage}
                    />

                    <div className="user-group-item-info">
                        <div className="user-group-item-names">
                            <p className="user-group-item-nickname">Pillow World</p>
                            <p className="user-group-item-username">@PillowWorld</p>
                        </div>

                        <div className="user-group-item-members">
                            <p className="user-group-item-value">11</p>
                            <p className="user-group-item-label">Members</p>
                        </div>
                    </div>
                </div>

                <div className="user-group-item">
                    <img
                        className="user-group-item-image"
                        src={user.backgroundImage}
                    />

                    <div className="user-group-item-info">
                        <div className="user-group-item-names">
                            <p className="user-group-item-nickname">Pillow World</p>
                            <p className="user-group-item-username">@PillowWorld</p>
                        </div>

                        <div className="user-group-item-members">
                            <p className="user-group-item-value">11</p>
                            <p className="user-group-item-label">Members</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}