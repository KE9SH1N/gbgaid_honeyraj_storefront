"use client";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const ContactUsCover = () => {
	const selectedLanguage = useSelector(languageSelector);
	return (
		<div className=" ct-container">
			<div>
				<div className=" relative">
					<Image
						src="/image/contact-us/contact-us-cover.png"
						alt=""
						width={1440}
						height={417}
						layout="responsive"
					/>

					<div className="absolute inset-0 flex items-center justify-center">
						{selectedLanguage === "en" ? (
							<h2 className="text-white text-2xl font-bold capitalize">
								Contact us
							</h2>
						) : (
							<h2 className="text-white text-2xl font-bold capitalize">
								যোগাযোগ করুন
							</h2>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUsCover;
