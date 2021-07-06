// Packages

// Components
import { Loading } from '../../components/Loading/Loading';
import { MeetUserList } from './MeetUserList';
import { FriendsList } from '../../components/FriendsList/FriendsList';

// Logic
import { MeetLogic } from './MeetLogic';

// Context

// Styles
import '../Pages.css';
import './Meet.css';

// Assets


export const Meet = () => {
    const { loading } = MeetLogic();

    if (loading) {
        return (
            <div className="page">
                <Loading />
            </div>
        )
    } else {
        return (
            <div className="page">
                <div className="meet-page">
                    <MeetUserList />
                </div>

                <FriendsList />
            </div>
        )
    }
}