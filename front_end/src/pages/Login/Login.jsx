// Packages
import * as fa from "react-icons/fa";

// Components
import { TopBar } from "../../components/TopBar/TopBar";
import { Input } from "../../components/Input/Input";

// Logic
import { LoginLogic } from "./LoginLogic";

// Context

// Styles
import "../Pages.css";
import "./Login.css";

// Assets

export const Login = () => {
	const { username, setUsername, password, setPassword, error, submit } =
		LoginLogic();

	return (
		<div className='page login-page'>
			<TopBar />

			<div className='login-container'>
				<h1>Login</h1>

				<div className='login-input-container'>
					<Input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						label={"Username"}
						type={"username"}
					></Input>
				</div>

				<div className='login-input-container'>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						label={"Password"}
						type={"password"}
					></Input>
				</div>

				<div className='login-submit-container'>
					<button onClick={submit}>
						<p>Log in</p>
						<fa.FaSignInAlt />
					</button>
				</div>
			</div>
		</div>
	);
};
