import React from "react";
import ReturnRefundCover from "../../components/refund-return/ReturnRefundCover";
import FooterTop from "../../components/footer/FooterTop";
import FooterMain from "../../components/footer/FooterMain";
import GlobalLayout from "../../global-layout/GlobalLayout";
import Introduction from "../../components/refund-return/Introduction";
import ConditionsForReturns from "../../components/refund-return/ConditionsForReturns";
import NonReturnableProducts from "../../components/refund-return/NonReturnableProducts";
import ReturnProcess from "../../components/refund-return/ReturnProcess";
import RefundPolicy from "../../components/refund-return/RefundPolicy";
import ExchangePolicy from "../../components/refund-return/ExchangePolicy";
import ConditionsForProductReturnAcceptance from "../../components/refund-return/ConditionsForProductReturnAcceptance";
import ConditionsForProductReturnAcceptanceTwo from "../../components/refund-return/ConditionsForProductReturnAcceptanceTwo";
import DeliveryPartnerResponsibility from "../../components/refund-return/DeliveryPartnerResponsibility";
import Cancellations from "../../components/refund-return/Cancellations";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<ReturnRefundCover />
				<div className="my-28 ct-flex-start items-start flex-col gap-y-[70px]">
					<Introduction />
					<ConditionsForReturns />
					<NonReturnableProducts />
					<ReturnProcess />
					<RefundPolicy />
					<ExchangePolicy />
					<ConditionsForProductReturnAcceptance />
					<ConditionsForProductReturnAcceptanceTwo />
					<Cancellations />
					<DeliveryPartnerResponsibility />
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
