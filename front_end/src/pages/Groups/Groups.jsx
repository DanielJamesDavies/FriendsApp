// Packages

// Components
import { Loading } from '../../components/Loading/Loading';
import { GroupItem } from "../../components/GroupItem/GroupItem";
import { FriendsList } from '../../components/FriendsList/FriendsList';

// Logic
import { GroupsLogic } from "./GroupsLogic";

// Context

// Styles
import '../Pages.css';
import './Groups.css';

// Assets


export const Groups = () => {
    const { groups } = GroupsLogic();

    return (
        <div className="page">
            <div className="groups-page">
                <h1>Groups</h1>

                <div className="groups-container">
                    {groups === undefined ? <Loading /> :
                        groups.map((group, index) => (
                            <GroupItem key={index} group={group} />
                        ))
                    }
                </div>
            </div>

            <FriendsList />
        </div>
    )
}