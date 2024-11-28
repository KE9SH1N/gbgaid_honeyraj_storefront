import { useTranslations } from "next-intl";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { IoIosLock } from "react-icons/io";
import { LuPenLine } from "react-icons/lu";
import { MdBarChart } from "react-icons/md";

const MobileUserMenu = ({ handleUserSideMenuTab }: any) => {
	// For multi-language
	const t = useTranslations("userDashboard");
	return (
		<div>
			<div className="min-h-60">
				<ul className=" capitalize ct-grid-cols-2 md:ct-grid-cols-3 ">
					<li
						className="border border-[#F6F6F6] ct-flex-center flex-col gap-y-2 py-7 px-9 rounded cursor-pointer"
						onClick={() => {
							handleUserSideMenuTab("profile");
						}}
					>
						<FaRegUserCircle className="text-2xl md:text-3xl text-[#F68821]" />
						<p className=" text-sm md:text-base">
							{t("sideMenu.user-profile")}
						</p>
					</li>
					{/* <li
						className="border border-[#F6F6F6] ct-flex-center flex-col gap-y-2 py-7 px-9 rounded cursor-pointer"
						onClick={() => {
							handleUserSideMenuTab("orderStatus");
						}}
					>
						<GrStatusInfo className="text-2xl md:text-3xl text-[#F68821]" />
						<p className=" text-sm md:text-base">order status</p>
					</li> */}
					<li
						className="border border-[#F6F6F6] ct-flex-center flex-col gap-y-2 py-7 px-9 rounded cursor-pointer"
						onClick={() => {
							handleUserSideMenuTab("history");
						}}
					>
						<MdBarChart className="text-2xl md:text-3xl text-[#F68821]" />
						<p className=" text-sm md:text-base">
							{t("sideMenu.order-history")}
						</p>
					</li>
					<li
						className="border border-[#F6F6F6] ct-flex-center flex-col gap-y-2 py-7 px-9 rounded cursor-pointer"
						onClick={() => {
							handleUserSideMenuTab("review");
						}}
					>
						<LuPenLine className="text-2xl md:text-3xl text-[#F68821]" />
						<p className=" text-sm md:text-base">
							{t("sideMenu.write-review")}
						</p>
					</li>
					<li
						className="border border-[#F6F6F6] ct-flex-center flex-col gap-y-2 py-7 px-9 rounded cursor-pointer"
						onClick={() => {
							handleUserSideMenuTab("pin");
						}}
					>
						<IoIosLock className="text-2xl md:text-3xl text-[#F68821]" />
						<p className=" text-sm md:text-base">{t("sideMenu.change-pin")}</p>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default MobileUserMenu;
