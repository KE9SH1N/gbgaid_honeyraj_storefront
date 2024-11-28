import React from "react";
import HeadingOne from "../../components/privacy-policy/HeadingOne";
import HeadingTwo from "../../components/privacy-policy/HeadingTwo";
import HeadingThree from "../../components/privacy-policy/HeadingThree";
import PolicyCover from "../../components/privacy-policy/PolicyCover";
import FooterTop from "../../components/footer/FooterTop";
import FooterMain from "../../components/footer/FooterMain";
import GlobalLayout from "../../global-layout/GlobalLayout";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<PolicyCover />
				<HeadingOne />
				<HeadingTwo />
				<HeadingThree />
				<HeadingOne />
				<HeadingTwo />
				<HeadingThree />
				<HeadingTwo />
				<HeadingThree />
				<HeadingOne />
				<HeadingTwo />
				<div className="mb-[50px] lg:mb-0">
					<FooterTop />
					<FooterMain />
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
