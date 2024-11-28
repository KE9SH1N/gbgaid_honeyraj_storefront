import React from "react";
import CheckoutMain from "../../components/checkout/CheckoutMain";
import FooterMain from "../../components/footer/FooterMain";
import GlobalLayout from "../../global-layout/GlobalLayout";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<CheckoutMain />
				<div className="mb-[100px] lg:mb-0">
					<FooterMain />
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
