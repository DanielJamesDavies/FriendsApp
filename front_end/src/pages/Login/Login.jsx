// Packages
import { FaSignInAlt } from "react-icons/fa";

// Components
import { TopBar } from "../../components/TopBar/TopBar";
import { Input } from "../../components/Input/Input";
import { Loading } from "../../components/Loading/Loading";

// Logic
import { LoginLogic } from "./LoginLogic";

// Context

// Styles
import "../Pages.css";
import "./Login.css";

// Assets

export const Login = () => {
	const { username, setUsername, password, setPassword, error, submit, loading } = LoginLogic();

	return (
		<div className='page login-page'>
			<TopBar />

			<div className='login-container'>
				<h1>Login</h1>

				{error ? (
					<div className='login-error-container'>
						<p>
							<b>Error: </b>
							{error}
						</p>
					</div>
				) : null}

				<div className='login-input-container'>
					<Input value={username} onChange={(e) => setUsername(e.target.value)} label={"Username"} type={"username"}></Input>
				</div>

				<div className='login-input-container'>
					<Input value={password} onChange={(e) => setPassword(e.target.value)} label={"Password"} type={"password"}></Input>
				</div>

				<div className='login-submit-container'>
					{!loading ? (
						<button onClick={submit}>
							<p>Log in</p>
							<FaSignInAlt />
						</button>
					) : (
						<Loading />
					)}
				</div>
			</div>
		</div>
	);
};
