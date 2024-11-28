let ReactPixel;

const options = {
	autoConfig: true,
	debug: false,
};

export const initFacebookPixel = (pixelId) => {
	if (typeof window !== "undefined") {
		if (!ReactPixel) {
			// Dynamically import ReactPixel only on the client side
			ReactPixel = require("react-facebook-pixel").default;
		}
		ReactPixel.init(pixelId, {}, options);
	}
};

export const trackPageView = () => {
	if (typeof window !== "undefined" && ReactPixel) {
		ReactPixel.pageView();
	}
};

export const trackEvent = (event, data) => {
	if (typeof window !== "undefined" && ReactPixel) {
		ReactPixel.track(event, data);
	}
};
