"use client";
import React from "react";
import SectionHead from "../../../util/SectionHead";
import { useSelector } from "react-redux";
import { selectUserDetailsData } from "@/app/redux/features/auth/userDetailsSlice";
import { getUserInfo } from "@/app/lib/common/AuthTokenDecoder";
import { useTranslations } from "next-intl";

const UserProfileBio = () => {
	const decoded = getUserInfo() as any;
	const errorMessage = "Error";
	const userId = decoded?.id;

	const userData = useSelector(selectUserDetailsData);

	// For multi-language
	const t = useTranslations("userDashboard");

	return (
		<div className="w-full px-3 lg:px-0 my-6 lg:my-4">
			<div>
				<SectionHead headingText={t("profileInformation.title")} />
			</div>
			<div className="my-4 capitalize min-h-96">
				<ul className="ct-flex-start flex-col space-y-4 w-full text-sm lg:text-base">
					<li className="ct-flex-start space-x-6 w-full">
						<h1 className=" w-[30%] lg:text-lg font-medium">
							{t("profileInformation.info.full-name")}
						</h1>
						<span>:</span>
						<span className="w-[70%]">{userData?.name}</span>
					</li>
					<li className="ct-flex-start space-x-6 w-full">
						<h1 className=" w-[30%] lg:text-lg font-medium">
							{t("profileInformation.info.phone-number")}
						</h1>
						<span>:</span>
						<span className="w-[70%]">{userData?.phoneNumber}</span>
					</li>
					<li className="ct-flex-start space-x-6 w-full">
						<h1 className=" w-[30%] lg:text-lg font-medium">
							{t("profileInformation.info.additional-phoneNumber")}
						</h1>
						<span>:</span>
						<span className="w-[70%]">{userData?.aditionalPhoneNumber}</span>
					</li>
					<li className="ct-flex-start space-x-6 w-full">
						<h1 className=" w-[30%] lg:text-lg font-medium">
							{t("profileInformation.info.email")}
						</h1>
						<span>:</span>
						<span className="w-[70%] lowercase">{userData?.email}</span>
					</li>
					<li className="ct-flex-start space-x-6 w-full">
						<h1 className=" w-[30%] lg:text-lg font-medium">
							{t("profileInformation.info.division")}
						</h1>
						<span>:</span>
						<span className="w-[70%]">{userData?.division}</span>
					</li>
					<li className="ct-flex-start space-x-6 w-full">
						<h1 className=" w-[30%] lg:text-lg font-medium">
							{t("profileInformation.info.district")}
						</h1>
						<span>:</span>
						<span className="w-[70%]">{userData?.district}</span>
					</li>
					<li className="ct-flex-start space-x-6 w-full">
						<h1 className=" w-[30%] lg:text-lg font-medium">
							{t("profileInformation.info.thana")}
						</h1>
						<span>:</span>
						<span className="w-[70%]">{userData?.thana}</span>
					</li>
					<li className="ct-flex-start space-x-6 w-full">
						<h1 className=" w-[30%] lg:text-lg font-medium">
							{t("profileInformation.info.local-address")}
						</h1>
						<span>:</span>
						<span className="w-[70%]">{userData?.buildingAddress}</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default UserProfileBio;
