// Packages
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets


export const UserItemLogic = () => {
    const history = useHistory();

    function toUser(username) {
        history.push("/user/" + username + "/");
    }

    function compatibilityValueClassName(compatibility) {
        var className = "user-item-compatibility-value ";
        if (compatibility >= 0 && compatibility < 20)
            return className + "user-item-compatibility-value-very-low";
        if (compatibility >= 20 && compatibility < 40)
            return className + "user-item-compatibility-value-low";
        if (compatibility >= 40 && compatibility < 60)
            return className + "user-item-compatibility-value-medium";
        if (compatibility >= 60 && compatibility < 80)
            return className + "user-item-compatibility-value-high";
        if (compatibility >= 80 && compatibility < 100)
            return className + "user-item-compatibility-value-very-high";
    }

    return { toUser, compatibilityValueClassName }
}