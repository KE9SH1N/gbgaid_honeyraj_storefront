import TagManager from "react-gtm-module";

const tagManagerArgs = {
	gtmId: "GTM-5XNTN64Q",
};

export const initGoogleTagManager = () => {
	TagManager.initialize(tagManagerArgs);
};
