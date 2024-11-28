import React from "react";
import CustomButton from "../../util/CustomButton";
import { TbLogout2 } from "react-icons/tb";
import SideProfileMenuItems from "./SideProfileMenuItems";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
	setMessage,
	setOpen,
} from "@/app/redux/features/notification/toasterSlice";
import { handleLogout } from "@/app/lib/common/Logout";

const ProfileSideMenu = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	// For multi-language
	const t = useTranslations("userDashboard");
	return (
		<div className="hidden lg:flex justify-between flex-col w-[20%] min-h-[75vh] border-r border-borderLine my-6">
			<div>
				<SideProfileMenuItems />
			</div>
			<div
				onClick={() => {
					window.location.href = "/";

					handleLogout();
				}}
				className="w-[90%] inner-border inner-border-[#F68821] py-3 rounded capitalize font-medium text-[#F68821] cursor-pointer ct-flex-center space-x-3"
			>
				<TbLogout2 className="text-2xl" />
				<CustomButton buttonText={t("sideMenu.logout")} />
			</div>
		</div>
	);
};

export default ProfileSideMenu;
