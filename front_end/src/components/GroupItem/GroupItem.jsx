// Packages

// Components

// Logic

// Context

// Styles
import './GroupItem.css';

// Assets


export const GroupItem = ({ user }) => {
    return (
        <div className="group-item">
            <img
                className="group-item-image"
                src={user.backgroundImage}
            />

            <div className="group-item-info">
                <div className="group-item-names">
                    <p className="group-item-nickname">Pillow World</p>
                    <p className="group-item-username">@PillowWorld</p>
                </div>

                <div className="group-item-members">
                    <p className="group-item-value">11</p>
                    <p className="group-item-label">Members</p>
                </div>
            </div>
        </div>
    )
}