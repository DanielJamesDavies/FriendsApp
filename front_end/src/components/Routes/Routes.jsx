// Packages
import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";

// Components
import { Landing } from "../../pages/Landing/Landing";
import { Login } from "../../pages/Login/Login";
import { Register } from "../../pages/Register/Register";
import { Profile } from "../../pages/Profile/Profile";
import { Messages } from "../../pages/Messages/Messages";
import { Meet } from "../../pages/Meet/Meet";
import { Friends } from "../../pages/Friends/Friends";
import { Groups } from "../../pages/Groups/Groups";
import { Settings } from "../../pages/Settings/Settings";
import { User } from "../../pages/User/User";

// Logic

// Context

// Styles

// Assets

export const Routes = ({ token }) => {
	const history = useHistory();

	useEffect(() => {
		if (!token && !["", "/", "/login", "/login/", "/register", "/register/"].includes(history.location.pathname)) history.push("/login");
	}, [token, history]);

	return (
		<>
			{!token ? (
				<>
					<Route exact path='/' component={Landing} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
				</>
			) : (
				<div className='page-container'>
					<Route exact path='/profile' component={Profile} />
					<Route exact path='/messages' component={Messages} />
					<Route exact path='/meet' component={Meet} />
					<Route exact path='/friends' component={Friends} />
					<Route exact path='/groups' component={Groups} />
					<Route exact path='/settings' component={Settings} />
					<Route exact path='/user/:username' component={User} />
				</div>
			)}
		</>
	);
};
