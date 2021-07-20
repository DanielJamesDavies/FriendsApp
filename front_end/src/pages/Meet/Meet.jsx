// Packages

// Components
import { MeetUserList } from "./MeetUserList";

// Logic

// Context

// Styles
import "../Pages.css";
import "./Meet.css";

// Assets

export const Meet = () => {
	return (
		<div className='page meet-page'>
			<div className='page-title'>
				<h1>Meet</h1>
			</div>

			<MeetUserList />
		</div>
	);
};
