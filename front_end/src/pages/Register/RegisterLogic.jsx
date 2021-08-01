// Packages
import { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Components

// Logic

// Context

// Styles

// Assets

export const RegisterLogic = () => {
	const history = useHistory();
	const [form, setForm] = useState(0);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const addProfilePictureInputRef = useRef();
	const addBannerInputRef = useRef();

	// Form Data
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [briefDescription, setBriefDescription] = useState("");
	const [fullDescription, setFullDescription] = useState([]);
	const [profilePicture, setProfilePicture] = useState("");
	const [banner, setBanner] = useState([]);

	function switchForm() {
		if (email === "" || username === "" || password === "") return setError("Please enter an Email, Username and Password.");
		setError("");
		if (form === 0) return setForm(1);
		if (form === 1) return setForm(0);
	}

	function changeProfilePicture(e) {
		if (e.target.files.length === 0) return false;
		const fr = new FileReader();
		fr.readAsDataURL(e.target.files[0]);
		fr.onload = () => {
			addBannerInputRef.current.value = [];

			var image = new Image();
			image.onload = async () => {
				var nonResizedImage = fr.result;
				var { resizedImage, resizedImageSize } = resizeImage(image, 300, 300);

				var imageLength = nonResizedImage.split(",")[1].split("=")[0].length;
				var imageSize = Math.floor(imageLength - (imageLength / 8) * 2);

				if (resizedImageSize >= imageSize) {
					image = nonResizedImage;
				} else {
					image = resizedImage;
					imageSize = resizedImageSize;
				}

				if (imageSize <= 1500000) setProfilePicture(image);
			};

			image.src = fr.result;
		};
		fr.onerror = (error) => {
			return console.log(error);
		};
	}

	async function changeBanner(e) {
		if (e.target.files.length === 0) return false;
		const fr = new FileReader();
		fr.readAsDataURL(e.target.files[0]);
		fr.onload = () => {
			addBannerInputRef.current.value = [];

			var image = new Image();
			image.onload = async () => {
				var nonResizedImage = fr.result;
				var { resizedImage, resizedImageSize } = resizeImage(image, 1500, 650);

				var imageLength = nonResizedImage.split(",")[1].split("=")[0].length;
				var imageSize = Math.floor(imageLength - (imageLength / 8) * 2);

				if (resizedImageSize >= imageSize) {
					image = nonResizedImage;
				} else {
					image = resizedImage;
					imageSize = resizedImageSize;
				}

				if (imageSize <= 1500000) setBanner(image);
			};

			image.src = fr.result;
		};
		fr.onerror = (error) => {
			return console.log(error);
		};
	}

	function resizeImage(image, maxWidth, maxHeight) {
		const { imageWidth, imageHeight } = getMaxImageSize(image.width, image.height, maxWidth, maxHeight);
		var canvas = document.createElement("canvas");
		canvas.width = imageWidth;
		canvas.height = imageHeight;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
		var resizedImage = canvas.toDataURL();

		var imageLength = resizedImage.split(",")[1].split("=")[0].length;
		var resizedImageSize = Math.floor(imageLength - (imageLength / 8) * 2);

		return { resizedImage, resizedImageSize };
	}

	function getMaxImageSize(currentWidth, currentHeight, maxWidth, maxHeight) {
		var imageWidth = currentWidth;
		var imageHeight = currentHeight;
		if (imageHeight > maxHeight) {
			imageHeight = maxHeight;
			imageWidth = maxHeight * (currentWidth / currentHeight);
		}
		if (imageWidth > maxWidth) {
			imageWidth = maxWidth;
			imageHeight = maxWidth * (currentHeight / currentWidth);
		}

		return { imageWidth, imageHeight };
	}

	function getImageFileSize(image) {
		var imageLength = image.split(",")[1].split("=")[0].length;
		return Math.floor(imageLength - (imageLength / 8) * 2);
	}

	async function submit() {
		if (nickname === "" || briefDescription === "" || fullDescription.length === 0 || profilePicture.length === 0 || banner.length === 0)
			return setError("Please add a Profile Picture and Banner, and enter a Nickname, Brief Description, and Full Description.");
		if (getImageFileSize(profilePicture) >= 1000000) return setError("Please add a Profile Picture that has a file size smaller than 1MB.");
		if (getImageFileSize(banner) >= 1000000) return setError("Please add a Banner that has a file size smaller than 1MB.");
		setError("");
		setLoading(true);

		const submitData = {
			user: {
				username: username,
				email: email,
				password: password,
			},
			profile: {
				nickname: nickname,
				briefDescription: briefDescription,
				fullDescription: fullDescription,
				profilePicture: profilePicture,
				banner: banner,
			},
		};

		const registered = await axios.post("http://localhost:3001/user/", submitData);

		if (registered.data.error) {
			console.log(registered.data.error);
			setLoading(false);
			return setError(registered.data.error.details[0].message);
		}
		if (registered.data.message) return history.push("/login");
	}

	return {
		username,
		setUsername,
		email,
		setEmail,
		password,
		setPassword,
		nickname,
		setNickname,
		briefDescription,
		setBriefDescription,
		fullDescription,
		setFullDescription,
		profilePicture,
		changeProfilePicture,
		banner,
		changeBanner,
		form,
		switchForm,
		submit,
		error,
		addProfilePictureInputRef,
		addBannerInputRef,
		loading,
	};
};
