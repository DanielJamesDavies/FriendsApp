// Packages

// Components
import { Loading } from '../../components/Loading/Loading';
import { UserTop } from './UserTop';
import { UserInfo } from './UserInfo';
import { UserGroups } from './UserGroups';
import { FriendsList } from '../../components/FriendsList/FriendsList';

// Logic
import { UserLogic } from './UserLogic';

// Context

// Styles
import '../Pages.css';
import './User.css';

// Assets


export const User = (props) => {
    var username = props.match.params.username;

    const { loading, user } = UserLogic();

    if (loading) {
        return (
            <div className="page">
                <Loading />
            </div>
        )
    } else {
        return (
            <div className="page">
                <div className="user-page">
                    <UserTop user={user} />
                    <UserInfo user={user} />
                    <UserGroups user={user} />
                </div>

                <FriendsList />
            </div>
        )
    }
}