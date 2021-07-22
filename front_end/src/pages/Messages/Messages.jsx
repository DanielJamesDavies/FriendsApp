// Packages

// Components
import { MessagesList } from "./MessagesList";

// Logic

// Context

// Styles
import "../Pages.css";
import "./Messages.css";

// Assets

export const Messages = () => {
	return (
		<div className='page messages-page'>
			<div className='page-title'>
				<h1>Messages</h1>
			</div>

			<MessagesList />
		</div>
	);
};
