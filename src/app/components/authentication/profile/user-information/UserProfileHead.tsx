"use client";
import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import { selectUserDetailsData } from "@/app/redux/features/auth/userDetailsSlice";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserProfileHead = ({ handleUserProfileEdit, editProfile }: any) => {
	const userData = useSelector(selectUserDetailsData);

	// For multi-language
	const t = useTranslations("userDashboard");

	return (
		<div className="my-6 w-full">
			<div className="ct-flex-center lg:ct-flex-start flex-col lg:flex-row space-y-4 lg:space-x-6">
				<div>
					{userData?.profilePicture ? (
						<Image
							src={`${getBaseUrl(true)}/${userData?.profilePicture}`}
							alt="profile image"
							width={100}
							height={100}
							className="object-cover w-32 h-32 border border-gray-300 rounded-xl"
							layout="fixed"
						/>
					) : (
						<Image
							src="/image/user-avater.jpg"
							alt=""
							width={100}
							height={100}
							className="w-36 object-cover"
						/>
					)}
				</div>

				<div className=" capitalize w-full ct-flex-center lg:ct-flex-start flex-col space-y-1">
					<h1 className=" text-4xl font-medium">{userData?.name}</h1>
					<p>{userData?.phoneNumber}</p>
					<p className=" lowercase">{userData?.email || "sample@email.com"}</p>

					{!editProfile ? (
						<div
							onClick={handleUserProfileEdit}
							className="py-2 rounded capitalize text-[#F68821] cursor-pointer ct-flex-center space-x-3"
						>
							<FaRegEdit className="text-xl" />
							<span className="text-sm">{t("profileHead.update-profile")}</span>
						</div>
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
};

export default UserProfileHead;
