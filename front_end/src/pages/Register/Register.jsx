// Packages
import * as fa from "react-icons/fa";

// Components
import { TopBar } from "../../components/TopBar/TopBar";
import { Input } from "../../components/Input/Input";

// Logic
import { RegisterLogic } from "./RegisterLogic";

// Context

// Styles
import "../Pages.css";
import "./Register.css";

// Assets

export const Register = () => {
	const {
		username,
		setUsername,
		nickname,
		setNickname,
		email,
		setEmail,
		password,
		setPassword,
		submit,
	} = RegisterLogic();

	return (
		<div className='page register-page'>
			<TopBar />

			<div className='register-container'>
				<h1>Create a New Account</h1>

				<div className='register-input-container'>
					<Input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						label={"Username"}
						type={"username"}
					></Input>
				</div>

				<div className='register-input-container'>
					<Input
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						label={"Nickname"}
						type={"nickname"}
					></Input>
				</div>

				<div className='register-input-container'>
					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						label={"Email"}
						type={"email"}
					></Input>
				</div>

				<div className='register-input-container'>
					<Input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						label={"Password"}
						type={"password"}
					></Input>
				</div>

				<div className='register-submit-container'>
					<button onClick={submit}>
						<p>Create New Account</p>
						<fa.FaPlusCircle />
					</button>
				</div>
			</div>
		</div>
	);
};
