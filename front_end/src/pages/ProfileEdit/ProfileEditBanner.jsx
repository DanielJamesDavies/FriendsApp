// Packages
import { useEffect } from "react";

// Components
import { SaveBtn } from "../../components/SaveBtn/SaveBtn";
import { RevertBtn } from "../../components/RevertBtn/RevertBtn";

// Logic
import { ProfileEditBannerLogic } from "./ProfileEditBannerLogic";

// Context

// Styles
import "../Pages.css";
import "./ProfileEdit.css";
import "./ProfileEditBanner.css";

// Assets

export const ProfileEditBanner = ({ profile, setProfile }) => {
	const { isMounted, banner, bannerInputRef, bannerMessage, changeBanner, saveBanner, revertBanner } = ProfileEditBannerLogic({ profile });

	useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line
	}, []);

	return (
		<div className='profile-edit-form-container profile-edit-banner-container'>
			<div className='profile-edit-form-title'>
				<h2 className='profile-edit-form-title-h2-with-btns'>Edit Banner</h2>
				<SaveBtn isSaved={banner === profile.banner} onClick={() => saveBanner(setProfile)} />
				<RevertBtn isSaved={banner === profile.banner} onClick={revertBanner} />
			</div>

			<div className='profile-edit-form-banner-container' onClick={() => bannerInputRef.current.click()}>
				{banner ? <img className='profile-edit-form-banner' src={banner} alt='' /> : <div className='profile-edit-form-banner' />}
				<div className='profile-edit-form-banner-filter' />
				<input style={{ display: "none" }} ref={bannerInputRef} type='file' onChange={changeBanner} />
			</div>
			{bannerMessage ? <p className='profile-edit-form-banner-message'>{bannerMessage}</p> : null}
		</div>
	);
};
