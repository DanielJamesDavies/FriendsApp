// Packages

// Components
import { FriendsUserList } from "./FriendsUserList";

// Logic

// Context

// Styles
import "../Pages.css";
import "./Friends.css";

// Assets

export const Friends = () => {
	return (
		<div className='page friends-page'>
			<div className='page-title'>
				<h1>Friends</h1>
			</div>

			<FriendsUserList />
		</div>
	);
};
