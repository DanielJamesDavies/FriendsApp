// Packages
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets


export const FriendsListItemLogic = () => {
    const history = useHistory();

    function toUser(username) {
        history.push("/user/" + username + "/");
    }

    return { toUser }
}