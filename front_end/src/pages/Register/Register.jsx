// Packages

// Components
import { TopBar } from "../../components/TopBar/TopBar";
import { RegisterUser } from "./RegisterUser";
import { RegisterProfile } from "./RegisterProfile";

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
		email,
		setEmail,
		password,
		setPassword,
		nickname,
		setNickname,
		bio,
		setBio,
		description,
		setDescription,
		form,
		switchForm,
		submit,
		error,
	} = RegisterLogic();

	return (
		<div className='page register-page'>
			<TopBar />

			<div className='register-container'>
				<h1>Create a New Account</h1>

				{form === 0 ? (
					<RegisterUser
						username={username}
						setUsername={setUsername}
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						switchForm={switchForm}
						error={error}
					/>
				) : (
					<RegisterProfile
						nickname={nickname}
						setNickname={setNickname}
						bio={bio}
						setBio={setBio}
						description={description}
						setDescription={setDescription}
						switchForm={switchForm}
						submit={submit}
						error={error}
					/>
				)}
			</div>
		</div>
	);
};
