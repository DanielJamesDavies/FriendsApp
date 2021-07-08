// Packages

// Components

// Logic
import { TopBarLogic } from './TopBarLogic';

// Context

// Styles
import './TopBar.css';

// Assets


export const TopBar = () => {
    const { toPage } = TopBarLogic();

    return (
        <div className="top-bar">

            <div className="top-bar-logo-container">

                <button
                    className="top-bar-logo-btn"
                    onClick={() => toPage("/")}
                >
                    Friends App
                </button>

            </div>

            <div className="top-bar-btn-container">

                <button
                    className="top-bar-btn"
                    onClick={() => toPage("/login")}
                >
                    Log-In
                </button>

                <button
                    className="top-bar-btn"
                    onClick={() => toPage("/register")}
                >
                    Register
                </button>

            </div>

        </div>
    )
}