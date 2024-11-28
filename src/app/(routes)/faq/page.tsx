import React from "react";
import FaqCover from "../../components/faq/FaqCover";
import GeneralFaq from "../../components/faq/GeneralFaq";
import BillingFaq from "../../components/faq/BillingFaq";
import FaqFooter from "../../components/faq/FaqFooter";
import FooterTop from "../../components/footer/FooterTop";
import FooterMain from "../../components/footer/FooterMain";
import GlobalLayout from "../../global-layout/GlobalLayout";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<FaqCover />
				<GeneralFaq />
				<BillingFaq />
				<FaqFooter />
				<div className="mb-[50px] lg:mb-0">
					<FooterTop />
					<FooterMain />
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
