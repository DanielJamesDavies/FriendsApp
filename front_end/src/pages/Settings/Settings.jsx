// Packages

// Components
import { FriendsList } from '../../components/FriendsList/FriendsList';

// Logic

// Context

// Styles
import '../Pages.css';
import './Settings.css';

// Assets


export const Settings = () => {
    return (
        <div className="page">
            <div className="settings-page">
                <h1>Settings</h1>
            </div>

            <FriendsList />
        </div>
    )
}