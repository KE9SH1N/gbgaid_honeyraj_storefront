import React from "react";
import ConfirmOrder from "../../../components/order-confirm/ConfirmOrder";
import BackToHome from "../../../components/util/BackToHome";
import YouMayLike from "../../../components/util/YouMayLike";
import GlobalLayout from "../../../global-layout/GlobalLayout";
import FooterMain from "../../../components/footer/FooterMain";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<ConfirmOrder />
				<YouMayLike />
				<BackToHome />
				<FooterMain />
			</GlobalLayout>
		</div>
	);
};

export default page;
