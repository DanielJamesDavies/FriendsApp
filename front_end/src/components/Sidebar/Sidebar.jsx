// Packages
import * as fa from "react-icons/fa";

// Components

// Logic
import { SidebarLogic } from './SidebarLogic';

// Context

// Styles
import './Sidebar.css';

// Assets


export const Sidebar = () => {
    const { toPage } = SidebarLogic();

    return (
        <div className="sidebar">

            <div className="sidebar-buttons">

                <button
                    className="sidebar-button sidebar-button-user"
                    onClick={() => toPage("/profile")}
                >
                    <fa.FaUser />
                </button>

                <button
                    className="sidebar-button sidebar-button-home"
                    onClick={() => toPage("/")}
                >
                    <fa.FaHome />
                </button>

                <button
                    className="sidebar-button sidebar-button-meet"
                    onClick={() => toPage("/meet")}
                >
                    <fa.FaHandshake />
                </button>

                <button
                    className="sidebar-button sidebar-button-groups"
                    onClick={() => toPage("/groups")}
                >
                    <fa.FaUsers />
                </button>

                <button
                    className="sidebar-button sidebar-button-settings"
                    onClick={() => toPage("/settings")}
                >
                    <fa.FaCog />
                </button>

            </div>

        </div>
    )
}