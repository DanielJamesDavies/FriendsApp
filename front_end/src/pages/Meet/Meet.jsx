// Packages

// Components
import { MeetUserList } from './MeetUserList';
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
                <MeetUserList />
            </div>

            <FriendsList />
        </div>
    )
}