"use client";
import { useTranslations } from "next-intl";
import React from "react";

interface CancelOrderModalProps {
	handleCancelOrder: () => void;
	onClose: () => void;
}

const Modal: React.FC<CancelOrderModalProps> = ({
	onClose,
	handleCancelOrder,
}) => {
	const t = useTranslations("singleOrderDetails");
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-10">
				<h2 className="text-xl text-center font-medium mb-8 text-gray-800">
					{t("orderSummary.cancelOrderModal.cancelOrderMesg")}
				</h2>
				<div className="ct-flex-between w-[70%] mx-auto gap-4">
					<button
						onClick={onClose}
						className="px-8 py-1.5 rounded-sm text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 smooth-animation-mid"
					>
						{t("orderSummary.cancelOrderModal.no")}
					</button>
					<button
						onClick={handleCancelOrder}
						className="px-8 py-1.5 rounded-sm text-sm text-white bg-gbInactiveColor hover:bg-gbInactiveColorLight smooth-animation-mid"
					>
						{t("orderSummary.cancelOrderModal.yes")}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
