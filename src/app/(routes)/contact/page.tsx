import React from "react";
import ContactUsCover from "../../components/contact-us/ContactUsCover";
import ContactUsMain from "../../components/contact-us/ContactUsMain";
import FooterTop from "../../components/footer/FooterTop";
import FooterMain from "../../components/footer/FooterMain";
import GlobalLayout from "../../global-layout/GlobalLayout";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<ContactUsCover />
				<ContactUsMain />
				<div className="mb-[50px] lg:mb-0">
					<FooterTop />
					<FooterMain />
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
