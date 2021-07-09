// Packages

// Components

// Logic
import { GroupItemLogic } from './GroupItemLogic';

// Context

// Styles
import './GroupItem.css';

// Assets


export const GroupItem = ({ group }) => {
    const { toGroup } = GroupItemLogic();

    return (
        <div
            className="group-item"
            onClick={() => toGroup("PillowWorld")}
        >
            {group.backgroundImage === undefined ? null :
                <img
                    className="group-item-image"
                    src={group.backgroundImage}
                />
            }

            <div className="group-item-info">
                <div className="group-item-names">
                    <p className="group-item-name">{group.name}</p>
                    <p className="group-item-description">{group.description}</p>
                </div>

                <div className="group-item-members">
                    <p className="group-item-value">{group.memberCount}</p>
                    <p className="group-item-label">Members</p>
                </div>
            </div>
        </div>
    )
}