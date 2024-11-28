"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { IoCallOutline, IoCopyOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { IoIosCall } from "react-icons/io";
import { FaWhatsappSquare } from "react-icons/fa";
import Link from "next/link";

const CustomerSupport = () => {
	const [buttonText, setButtonText] = useState("copy");
	const [telLink, setTelLink] = useState("tel:09642922922");
	const selectedLanguage = useSelector(languageSelector);
	const t = useTranslations("mobileMenu");
	const handleCopy = () => {
		const textToCopy = t("support.cs-number");
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				setButtonText("copied!");
				setTimeout(() => setButtonText("copy"), 5000);
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	};

	const handleCallClick = () => {
		window.location.href = telLink;
		setTelLink("");
		setTimeout(() => {
			setTelLink("tel:09642922922");
		}, 1000);
	};

	const handleWhatsApp = () => {
		window.location.href = "https://wa.me/+8801315302640";
		setTimeout(() => {
			location.reload();
		}, 1000);
	};
	return (
		<div className="w-full ct-flex-between items-start flex-col lg:flex-row gap-y-3 my-5">
			<div className="w-full lg:w-[50%]">
				<p className=" capitalize font-semibold text-lg mb-3">
					{t("support.callForOrder.title")}
				</p>
				<div className="w-full ct-flex-between items-start gap-y-3 flex-col lg:flex-row">
					<div className="w-full ct-flex-start flex-row space-x-2">
						<span className=" bg-gbCustomScrollThumbColor text-xs lg:text-lg ct-flex-center gap-x-1 w-fit rounded px-2 py-2 lg:py-[2px]">
							<IoIosCall className="text-base lg:text-2xl" />
							{t("support.cs-number")}
						</span>
						<button
							onClick={handleCallClick}
							className="lg:hidden flex items-center gap-x-1 border border-gray-300 px-2 py-[3px] rounded text-green-500"
						>
							<IoCallOutline className="text-xl" />
							<span className="capitalize">
								{t("support.callForOrder.call")}
							</span>
						</button>
						<button
							onClick={handleCopy}
							className={`ct-flex-center gap-x-1 border  ${
								buttonText === "copied!"
									? "border-gbActiveColor"
									: "border-gray-300"
							} px-2 py-[3px] rounded text-slate-400`}
						>
							<IoCopyOutline
								className={`text-xl ${
									buttonText === "copied!"
										? "text-gbActiveColor"
										: "text-slate-400"
								}`}
							/>

							<span
								className={`capitalize ${
									buttonText === "copied!"
										? "text-gbActiveColor"
										: "text-slate-400"
								}`}
							>
								{buttonText}
							</span>
						</button>
					</div>
				</div>
			</div>
			<div className="w-full lg:w-[50%]">
				<p className=" capitalize font-semibold text-lg mb-3">
					{t("support.ForNonBangladeshi.title")}
				</p>
				<div className="w-full ">
					<p className="w-full ct-flex-start items-center space-x-2">
						<span>
							<FaWhatsappSquare className="text-gbActiveColor text-[35px]" />
						</span>
						<button
							onClick={handleWhatsApp}
							className=" border border-gbActiveColor rounded px-4 py-[3px]"
						>
							{t("support.ForNonBangladeshi.What's-app")}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CustomerSupport;
