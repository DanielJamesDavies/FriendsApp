// Packages

// Components
import { FriendsList } from '../../components/FriendsList/FriendsList';

// Logic

// Context

// Styles
import '../Pages.css';
import './Meet.css';

// Assets


export const Meet = () => {
    return (
        <div className="page">
            <div className="meet-page">
                <h1>Meet</h1>
            </div>

            <FriendsList />
        </div>
    )
}