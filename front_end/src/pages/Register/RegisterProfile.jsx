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

export const RegisterProfile = ({
	nickname,
	setNickname,
	bio,
	setBio,
	description,
	setDescription,
	profilePicture,
	changeProfilePicture,
	backgroundImage,
	changeBackgroundImage,
	switchForm,
	submit,
	error,
	addProfilePictureInputRef,
	addBackgroundImageInputRef,
}) => {
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

			{/* Profile Picture Input */}
			<input style={{ display: "none" }} ref={addProfilePictureInputRef} type='file' onChange={changeProfilePicture} />
			<div className='register-image-input-container register-profile-picture-input-container'>
				<p className='register-image-input-label'>Profile Picture</p>
				<button onClick={() => addProfilePictureInputRef.current.click()}>
					{profilePicture.length !== 0 ? (
						<img src={profilePicture} />
					) : (
						<svg height='60' width='60'>
							<circle cx='30' cy='30' r='30' />
						</svg>
					)}
				</button>
			</div>

			{/* Nickname Input */}
			<div className='register-input-container'>
				<Input
					value={nickname}
					onChange={(e) => setNickname(e.target.value)}
					label={"Nickname"}
					type={"nickname"}
					id={"input-nickname"}
				></Input>
			</div>

			{/* Background Image Input */}
			<input style={{ display: "none" }} ref={addBackgroundImageInputRef} type='file' onChange={changeBackgroundImage} />
			<div className='register-image-input-container'>
				<p className='register-image-input-label'>Background Image</p>
				<button onClick={() => addBackgroundImageInputRef.current.click()}>
					{console.log(backgroundImage)}
					{backgroundImage.length !== 0 ? <img src={backgroundImage} /> : <div className='register-background-image-blank-input' />}
				</button>
			</div>

			{/* Bio Input */}
			<div className='register-input-container'>
				<Input value={bio} onChange={(e) => setBio(e.target.value)} label={"Bio"} type={"bio"} id={"input-bio"}></Input>
			</div>

			{/* Description Input */}
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
