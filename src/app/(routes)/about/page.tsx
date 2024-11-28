import React from "react";
import AboutCover from "../../components/about-us/AboutCover";
import FooterTop from "../../components/footer/FooterTop";
import FooterMain from "../../components/footer/FooterMain";
import GlobalLayout from "../../global-layout/GlobalLayout";
import AboutUsCommonComponent from "../../components/about-us/AboutUsCommonComponent";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<AboutCover />
				<div className="ct-container my-12 lg:my-32">
					<AboutUsCommonComponent />
				</div>

				<div className="mb-[50px] lg:mb-0">
					<FooterTop />
					<FooterMain />
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
