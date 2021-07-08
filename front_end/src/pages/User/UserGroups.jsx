// Packages
import * as fa from "react-icons/fa";

// Components
import { GroupItem } from "../../components/GroupItem/GroupItem";

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

                <GroupItem user={user} />

            </div>

        </div>
    )
}