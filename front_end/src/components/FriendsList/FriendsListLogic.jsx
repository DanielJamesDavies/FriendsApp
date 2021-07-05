// Packages
import { useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets
import friends from './friends.json';


export const FriendsListLogic = () => {
    const [searchValue, setSearchValue] = useState("");
    const [friendsList, setFriendsList] = useState(friends);
    const [filteredFriendsList, setFilteredFriendsList] = useState(friends);

    function changeSearchValue(e) {
        setSearchValue(e.target.value);
        setFilteredFriendsList(
            friendsList.filter(friend =>
                friend.nickname.toLowerCase().includes(e.target.value.toLowerCase()) ||
                friend.username.toLowerCase().includes(e.target.value.toLowerCase())
            )
        )
    }

    return { searchValue, changeSearchValue, filteredFriendsList }
}