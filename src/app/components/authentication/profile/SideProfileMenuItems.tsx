"use client";
import React from "react";
import { LuPenLine } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { MdBarChart } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { GrStatusInfo } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUserTab } from "@/app/redux/features/auth/userDashboardSlice";
import { useTranslations } from "next-intl";

const SideProfileMenuItems = () => {
	const activeUserDashboardTab = useSelector(
		(state: any) => state.userdashboardtab.activeUserDashboardTab
	);

	const dispatch = useDispatch();

	const handleUserSideMenuTab = (tabName: string) => {
		dispatch(setActiveUserTab(tabName));
	};

	// For multi-language
	const t = useTranslations("userDashboard");
	return (
		<div className="lg:flex md:flex-col w-[90%]">
			<ul className="w-full capitalize">
				<li
					className={`py-3 ${
						activeUserDashboardTab === "profile" ? "bg-[#FDE7D3]" : ""
					} rounded ct-flex-center space-x-2 cursor-pointer`}
					onClick={() => handleUserSideMenuTab("profile")}
				>
					<span>
						<FaRegUserCircle className="text-lg" />
					</span>
					<span className=" w-36">{t("sideMenu.user-profile")}</span>
				</li>

				{/* <li
					className={`py-3 ${
						activeUserDashboardTab === "orderStatus" ? "bg-[#FDE7D3]" : ""
					} rounded ct-flex-center space-x-2 cursor-pointer`}
					onClick={() => handleUserSideMenuTab("orderStatus")}
				>
					<span>
						<GrStatusInfo className="text-lg" />
					</span>
					<span className=" w-36">{t("sideMenu.order-status")}</span>
				</li> */}

				<li
					className={`py-3 ${
						activeUserDashboardTab === "history" ? "bg-[#FDE7D3]" : ""
					} rounded ct-flex-center space-x-2 cursor-pointer`}
					onClick={() => handleUserSideMenuTab("history")}
				>
					<span>
						<MdBarChart className="text-lg" />
					</span>
					<span className=" w-36">{t("sideMenu.order-history")}</span>
				</li>
				{/* <li
					className={`py-3 ${
						activeUserDashboardTab === "review" ? "bg-[#FDE7D3]" : ""
					} rounded ct-flex-center space-x-2 cursor-pointer`}
					onClick={() => handleUserSideMenuTab("review")}
				>
					<span>
						<LuPenLine className="text-lg" />
					</span>
					<span className=" w-36">{t("sideMenu.write-review")}</span>
				</li> */}
				<li
					className={`py-3 ${
						activeUserDashboardTab === "pin" ? "bg-[#FDE7D3]" : ""
					} rounded ct-flex-center space-x-2 cursor-pointer`}
					onClick={() => handleUserSideMenuTab("pin")}
				>
					<span>
						<IoIosLock className="text-lg" />
					</span>
					<span className=" w-36">{t("sideMenu.change-pin")}</span>
				</li>
			</ul>
		</div>
	);
};

export default SideProfileMenuItems;
