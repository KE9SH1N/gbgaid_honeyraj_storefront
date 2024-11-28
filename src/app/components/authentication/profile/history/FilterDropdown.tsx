"use client";

import UseOutsideClickAndEscape from "@/app/hooks/useDropdown";
import React, { useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";

const FilterDropdown = () => {
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Custom hook for dropdown ref
	UseOutsideClickAndEscape(dropdownRef, setDropdownOpen);

	const activeUserDashboardTabMobile = useSelector(
		(state: any) => state.userdashboardtab.activeUserDashboardTabMobile
	);
	const toggleDropdownOrderStatus = () => {
		setDropdownOpen(!isDropdownOpen);
	};
	return (
		<div>
			<div
				className={`sm:w-[120px] lg:w-40 w-[105px] gap-4 py-3 `}
				ref={dropdownRef}
			>
				<div className="w-full ct-flex-between gap-x-4">
					<div
						onClick={toggleDropdownOrderStatus}
						className="w-full ct-flex-between shadow-md pl-2 font-medium cursor-pointer rounded py-2 bg-[#F6F6F6] capitalize"
					>
						<div className="text-xs lg:text-sm">
							{/* {selectedValue || dropdownText} */}filter order
						</div>
						<div>
							{!isDropdownOpen ? (
								<IoIosArrowDown className=" mx-1 lg:mx-4 font-medium text-lg" />
							) : (
								<IoIosArrowUp className="mx-1 lg:mx-4 font-medium text-lg" />
							)}
						</div>
					</div>
				</div>
				<div className="w-full relative">
					<div className="w-full">
						<div
							className={`w-full absolute shadow-lg bg-white top-1 left-0 flex flex-col items-start rounded-sm z-40 smooth-animation ${
								isDropdownOpen ? "opacity-100" : "hidden opacity-0"
							}`}
						>
							<ul className="w-full capitalize">
								<li className="w-full py-2 px-3 border-b text-xs border-borderLine bg-brandServiceBg hover:text-[#ffffff] hover:bg-[#F68821] hover:opacity-90 smooth-animation-mid">
									recent
								</li>
								<li className="w-full py-2 px-3 border-b text-xs border-borderLine bg-brandServiceBg hover:text-[#ffffff] hover:bg-[#F68821] hover:opacity-90 smooth-animation-mid">
									last 7 days
								</li>
								<li className="w-full py-2 px-3 border-b text-xs border-borderLine bg-brandServiceBg hover:text-[#ffffff] hover:bg-[#F68821] hover:opacity-90 smooth-animation-mid">
									last 1 month
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FilterDropdown;
