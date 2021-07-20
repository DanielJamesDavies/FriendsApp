// Packages

// Components

// Logic
import { UserItemLogic } from "./UserItemLogic";

// Context

// Styles
import "./UserItem.css";

// Assets

export const UserItem = ({ user, isFriend }) => {
	const { toUser, compatibilityValueClassName } = UserItemLogic();

	return (
		<div className='user-item-container'>
			<div
				className={
					user.backgroundImage !== undefined
						? "user-item user-item-with-background-image"
						: "user-item user-item-without-background-image"
				}
				onClick={() => toUser(user.username)}
			>
				{/* {user.backgroundImage === undefined ? null :
                    <div className="user-item-background-container">
                        <div className="user-item-with-background-image-hover-filter" />
                        <img src={user.backgroundImage}
                            className="user-item-background"
                            alt=""
                        />
                    </div>
                } */}

				<div className='user-item-foreground'>
					<div className='user-item-profile-picture'>
						<svg height='50' width='50'>
							<circle cx='25' cy='25' r='25' />
						</svg>
					</div>

					<div className='user-item-names'>
						<p className='user-item-nickname'>{user.nickname}</p>
						<p className='user-item-username'>@{user.username}</p>

						{!isFriend ? null : (
							<p
								className={
									user.status !== "Offline"
										? "user-item-status user-item-status-online"
										: "user-item-status user-item-status-offline"
								}
							>
								{user.status}
							</p>
						)}
					</div>

					{isFriend || user.compatibility === undefined ? null : (
						<div className='user-item-compatibility'>
							<p className='user-item-compatibility-label'>Compatibility</p>
							<p className={compatibilityValueClassName(user.compatibility)}>{user.compatibility}%</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
