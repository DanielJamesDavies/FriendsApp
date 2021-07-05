// Packages

// Components
import { FriendsList } from '../../components/FriendsList/FriendsList';

// Logic

// Context

// Styles
import '../Pages.css';
import './Home.css';

// Assets


export const Home = () => {
    return (
        <div className="page">
            <div className="home-page">
                <h1>Home</h1>
            </div>

            <FriendsList />
        </div>
    )
}