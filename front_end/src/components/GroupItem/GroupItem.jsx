// Packages

// Components

// Logic
import { GroupItemLogic } from './GroupItemLogic';

// Context

// Styles
import './GroupItem.css';

// Assets


export const GroupItem = ({ user }) => {
    const { toGroup } = GroupItemLogic();

    return (
        <div
            className="group-item"
            onClick={() => toGroup("PillowWorld")}
        >
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