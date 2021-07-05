// Packages

// Components
import { FriendsList } from '../../components/FriendsList/FriendsList';

// Logic

// Context

// Styles
import '../Pages.css';
import './Profile.css';

// Assets


export const Profile = () => {
    return (
        <div className="page">
            <div className="profile-page">
                <h1>Profile</h1>
            </div>

            <FriendsList />
        </div>
    )
}