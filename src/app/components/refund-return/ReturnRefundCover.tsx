"use client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const ReturnRefundCover = () => {
	const selectedLanguage = useSelector(languageSelector);
	return (
		<div className="ct-container">
			<div className=" relative">
				<Image
					src="/image/return-refund/return-refund.png"
					alt=""
					width={1440}
					height={417}
					layout="responsive"
				/>

				<div className="absolute inset-0 flex items-center justify-center">
					{selectedLanguage === "en" ? (
						<h2 className="text-white text-2xl font-bold capitalize">
							return & refund policy
						</h2>
					) : (
						<h2 className="text-white text-2xl font-bold capitalize">
							রিটার্ন এবং রিফান্ড পলিসি
						</h2>
					)}
				</div>
			</div>
		</div>
	);
};

export default ReturnRefundCover;
