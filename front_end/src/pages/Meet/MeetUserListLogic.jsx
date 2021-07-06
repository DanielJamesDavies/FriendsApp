// Packages
import { useState } from "react";

// Components

// Logic

// Context

// Styles

// Assets
import users from './users.json';


export const MeetUserListLogic = () => {
    const [searchValue, setSearchValue] = useState("");
    const [usersList, setUsersList] = useState(users);
    const [filteredUsersList, setFilteredUsersList] = useState(users);

    function changeSearchValue(e) {
        setSearchValue(e.target.value);
        setFilteredUsersList(
            usersList.filter(user =>
                user.nickname.toLowerCase().includes(e.target.value.toLowerCase()) ||
                user.username.toLowerCase().includes(e.target.value.toLowerCase())
            )
        )
    }

    return { searchValue, changeSearchValue, filteredUsersList }
}