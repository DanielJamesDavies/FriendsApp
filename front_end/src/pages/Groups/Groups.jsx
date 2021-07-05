// Packages

// Components
import { FriendsList } from '../../components/FriendsList/FriendsList';

// Logic

// Context

// Styles
import '../Pages.css';
import './Groups.css';

// Assets


export const Groups = () => {
    return (
        <div className="page">
            <div className="groups-page">
                <h1>Groups</h1>
            </div>

            <FriendsList />
        </div>
    )
}