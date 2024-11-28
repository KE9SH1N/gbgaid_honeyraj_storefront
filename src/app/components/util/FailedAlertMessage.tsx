import { useTranslations } from "next-intl";
import React from "react";

interface OrderFailedProps {
	errorMesg: string[];
	closePopUp: () => void;
}

const FailedAlertMessage: React.FC<OrderFailedProps> = ({
	errorMesg,
	closePopUp,
}) => {
	// For multi-language
	const t = useTranslations("alertBox");
	return (
		<div className=" p-12">
			<div>
				{errorMesg.map((errorMesg, index) => (
					<div
						key={index}
						className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
					>
						<div className="bg-white rounded shadow-md overflow-hidden w-96">
							<div className="text-center p-3 font-medium text-white text-xl bg-[#ff9532]">
								<p className="text-center capitalize">{t("error-title")}</p>
							</div>
							<div className="p-6 w-full ct-flex-center flex-col">
								<p className="text-center lg:text-lg mb-4 capitalize">
									{errorMesg}
								</p>
								<button
									className="bg-gbInactiveColor w-[30%] mx-auto text-white py-2 rounded"
									onClick={() => {
										closePopUp();
									}}
								>
									{t("button-ok")}
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FailedAlertMessage;
