// Packages
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";

// Components
import { Input } from "../../components/Input/Input";
import { TextArea } from "../../components/TextArea/TextArea";

// Logic

// Context

// Styles
import "../Pages.css";
import "./Register.css";
import "./RegisterForm.css";

// Assets

export const RegisterProfile = ({ nickname, setNickname, bio, setBio, description, setDescription, switchForm, submit, error }) => {
	return (
		<div className='register-form-container'>
			<h2>Create a Profile</h2>

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
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					label={"Nickname"}
					type={"nickname"}
					id={"input-nickname"}
				></Input>
			</div>

			<div className='register-input-container'>
				<Input value={bio} onChange={(e) => setBio(e.target.value)} label={"Bio"} type={"bio"} id={"input-bio"}></Input>
			</div>

			<div className='register-input-container'>
				<TextArea
					value={description.join("\n")}
					onChange={(e) => setDescription(e.target.value.split("\n"))}
					label={"Description"}
					type={"description"}
					id={"input-description"}
				></TextArea>
			</div>

			<div className='register-form-switch-btn-container'>
				<button onClick={switchForm}>
					<FaArrowLeft />
				</button>
			</div>

			<div className='register-submit-container'>
				<button onClick={submit}>
					<p>Create New Account</p>
					<FaPlusCircle />
				</button>
			</div>
		</div>
	);
};
