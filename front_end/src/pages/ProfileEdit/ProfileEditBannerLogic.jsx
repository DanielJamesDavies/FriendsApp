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
			setBanner(fr.result);
			setBannerMessage(false);
			var imageLength = fr.result.split(",")[1].split("=")[0].length;
			var imageSize = Math.floor(imageLength - (imageLength / 8) * 2);
			if (imageSize > 1000000) setBannerMessage("Image too large.");
		};
		fr.onerror = (error) => {
			return console.log(error);
		};
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
