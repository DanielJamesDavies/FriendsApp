// Packages
import { useContext, useRef, useState } from "react";
import axios from "axios";

// Components

// Logic

// Context
import { UserContext } from "../../context/UserContext";

// Styles

// Assets

export const ProfileEditBannerLogic = ({ profile }) => {
	const { id, token } = useContext(UserContext);
	const isMounted = useRef(false);
	const [banner, setBanner] = useState(profile.banner);
	const bannerInputRef = useRef();
	const [bannerMessage, setBannerMessage] = useState(false);

	async function changeBanner(e) {
		if (e.target.files.length === 0) return false;
		const fr = new FileReader();
		fr.readAsDataURL(e.target.files[0]);
		fr.onload = () => {
			bannerInputRef.current.value = [];

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

				if (imageSize > 1500000) {
					setBannerMessage("Image too large.");
				} else {
					setBanner(image);
					setBannerMessage(false);
				}
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

	async function saveBanner(setProfile) {
		if (banner === profile.banner || banner === false) return false;
		var result = await axios.post("http://localhost:3001/profile/" + id, { banner: banner }, { headers: { token: token } });
		if (result.data && result.data.profile) {
			setProfile(result.data.profile);
		}
	}

	function revertBanner() {
		setBanner(profile.banner);
	}

	return {
		isMounted,
		banner,
		bannerInputRef,
		bannerMessage,
		changeBanner,
		saveBanner,
		revertBanner,
	};
};
