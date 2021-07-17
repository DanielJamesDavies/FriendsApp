// Packages
import { FaArrowRight } from "react-icons/fa";

// Components
import { Input } from "../../components/Input/Input";

// Logic

// Context

// Styles
import "../Pages.css";
import "./Register.css";
import "./RegisterForm.css";

// Assets

export const RegisterUser = ({ username, setUsername, email, setEmail, password, setPassword, switchForm, error }) => {
	return (
		<div className='register-form-container'>
			<h2>Create a User</h2>

			{error ? (
				<div className='register-form-error-container'>
					<p>
						<b>Error: </b>
						{error}
					</p>
				</div>
			) : null}

			<div className='register-input-container'>
				<Input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					label={"Username"}
					type={"username"}
					id={"input-username"}
				></Input>
			</div>

			<div className='register-input-container'>
				<Input value={email} onChange={(e) => setEmail(e.target.value)} label={"Email"} type={"email"} id={"input-email"}></Input>
			</div>

			<div className='register-input-container'>
				<Input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					label={"Password"}
					type={"password"}
					id={"input-password"}
				></Input>
			</div>

			<div className='register-form-switch-btn-container'>
				<button onClick={switchForm}>
					<FaArrowRight />
				</button>
			</div>
		</div>
	);
};
