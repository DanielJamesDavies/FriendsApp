// Packages
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets


export const SidebarLogic = () => {
    const history = useHistory();

    function toPage(address) {
        history.push(address);
    }

    return { toPage }
}