import React from "react";
import TermsAndConditionCover from "../../components/terms-condition/TermsAndConditionCover";
import FooterTop from "../../components/footer/FooterTop";
import FooterMain from "../../components/footer/FooterMain";
import GlobalLayout from "../../global-layout/GlobalLayout";
import Introduction from "../../components/terms-condition/Introduction";
import GeneralOverview from "../../components/terms-condition/GeneralOverview";
import ProductInformation from "../../components/terms-condition/ProductInformation";
import Pricing from "../../components/terms-condition/Pricing";
import OrderPlacement from "../../components/terms-condition/OrderPlacement";
import DeliveryAndShipping from "../../components/terms-condition/DeliveryAndShipping";
import DamageOrLostShipment from "../../components/terms-condition/DamageOrLostShipment";
import CustomerResponsibilities from "../../components/terms-condition/CustomerResponsibilities";
import CancellationPolicy from "../../components/terms-condition/CancellationPolicy";
import LimitationOfLiability from "../../components/terms-condition/LimitationOfLiability";
import PrivacyPolicy from "../../components/terms-condition/PrivacyPolicy";
import GoverningLaw from "../../components/terms-condition/GoverningLaw";
import AmendmentsToTheTerms from "../../components/terms-condition/AmendmentsToTheTerms";
import ContactInformation from "../../components/terms-condition/ContactInformation";
import PaymentTerms from "../../components/terms-condition/PaymentTerms";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<TermsAndConditionCover />
				<div className="ct-flex-start flex-col gap-y-[70px] my-12 lg:my-28 px-3">
					<Introduction />
					<GeneralOverview />
					<ProductInformation />
					<Pricing />
					<OrderPlacement />
					<PaymentTerms />
					<DeliveryAndShipping />
					<DamageOrLostShipment />
					<CustomerResponsibilities />
					<CancellationPolicy />
					<LimitationOfLiability />
					<PrivacyPolicy />
					<GoverningLaw />
					<AmendmentsToTheTerms />
					<ContactInformation />
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
