import React from "react";

const PrivacyPolicy = () => {
	return (
		<div className="ct-container">
			<h2 className="w-[70%] lg:w-full font-semibold text-[32px] lg:text-5xl leading-[38px] lg:leading-[58px]">
				Privacy Policy
			</h2>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-8">
				We value your privacy and ensure that your personal information is
				protected. Any information collected through your interactions with our
				website is subject to our Privacy Policy, which can be found [here]
				(insert link to the privacy policy page).
			</p>
			<p className="text-[#A8A8A8] text-xl lg:text-2xl font-medium leading-6 lg:leading-7 mt-4">
				We will not share your information with third parties except as required
				to process your order (e.g. delivery partners).
			</p>
		</div>
	);
};

export default PrivacyPolicy;
