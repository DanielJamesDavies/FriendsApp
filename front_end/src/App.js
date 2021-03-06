// Packages
import { useContext } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

// Components
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Routes } from "./components/Routes/Routes";

// Logic

// Context
import { UserContext } from "./context/UserContext";
import { SocketListeners } from "./context/SocketListeners";

// Styles
import "./styles/App.css";

// Assets

function App() {
	const { token } = useContext(UserContext);
	SocketListeners();

	return (
		<BrowserRouter>
			<div className={!token ? "unauthorised" : "authorised"}>
				<div className='App'>
					<div className='app-background'></div>
					{!token ? null : <Sidebar />}
					<Switch>
						<Routes token={token} />
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
