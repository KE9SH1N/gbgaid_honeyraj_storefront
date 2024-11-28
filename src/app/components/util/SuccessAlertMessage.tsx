"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetContactUsState } from "../../redux/features/util/contactUsSlice";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { useTranslations } from "next-intl";

interface ContactUsSuccessProps {
	successAlert: string;
	closePopUp: () => void;
}

const SuccessAlertMessage: React.FC<ContactUsSuccessProps> = ({
	closePopUp,
	successAlert,
}) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const selectedLanguage = useSelector(languageSelector);
	// For multi-language
	const t = useTranslations("alertBox");

	const resetAll = () => {
		dispatch(resetContactUsState());
	};
	return (
		<div>
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
				<div className="bg-white rounded shadow-md overflow-hidden w-96">
					<div className="text-center p-3 font-medium text-white text-xl bg-[#ff9532]">
						<p className="text-center capitalize">{t("success-title")}</p>
					</div>
					<div className="p-6 w-full ct-flex-center flex-col">
						<p className="text-center lg:text-lg mb-4 capitalize">
							{successAlert}
						</p>
						<button
							className="bg-[#03a64a] text-white font-bold py-2 px-8 rounded"
							onClick={() => {
								closePopUp();
								router.push(`/`);
								resetAll();
							}}
						>
							OK
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SuccessAlertMessage;
