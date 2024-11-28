"use client";
import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import {
	closeToaster,
	isToasterOpen,
	setMessage,
	setOpen,
	toasterMesg,
	toasterMesgType,
} from "../../redux/features/notification/toasterSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useTranslations } from "next-intl";

const PopUpToast = () => {
	const dispatch = useDispatch();
	const messages = useSelector(toasterMesg);
	const isOpenToast = useSelector(isToasterOpen);
	const toasterType = useSelector(toasterMesgType);
	// For multi-language
	const t = useTranslations("requestStockToasterMesg");

	useEffect(() => {
		if (isOpenToast) {
			const timer = setTimeout(() => {
				handleCloseAllMessages();
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [isOpenToast]);

	const handleCloseAllMessages = () => {
		dispatch(setOpen(false));
		const timer = setTimeout(() => {
			dispatch(closeToaster());
		}, 400);
		return () => clearTimeout(timer);
	};

	return (
		<div
			className={`${
				isOpenToast
					? "translate-x-0 fixed top-4 md:right-4 right-0"
					: "-translate-x-full fixed top-4 md:-right-full right-80 pointer-events-none"
			}  md:max-w-sm w-full bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex justify-between items-center space-x-4 smooth-animation-high z-50`}
		>
			<div className=" relative w-full">
				<div className="">
					{toasterType == "success" && (
						<div className="ct-flex-start flex-col gap-y-2 ">
							<p className="ct-flex-start items-center gap-x-2 font-bold text-xl text-gbActiveColor capitalize cursor-pointer">
								{t("mesgType.success")}
								<span>
									<IoIosCheckmarkCircle className=" text-xl" />
								</span>
							</p>
							<p className="text-sm text-gray-600 capitalize">{messages}</p>
						</div>
					)}

					{toasterType == "failed" && (
						<div className="ct-flex-start flex-col gap-y-2 ">
							<p className="ct-flex-start items-center gap-x-2 font-bold text-xl text-gbInactiveColor capitalize cursor-pointer">
								{t("mesgType.failed")}
								<span>
									<IoIosCheckmarkCircle className=" text-xl" />
								</span>
							</p>
							<p className="text-sm text-gray-600 capitalize">{messages}</p>
						</div>
					)}

					<button
						onClick={() => {
							handleCloseAllMessages();
						}}
						className="text-gray-400 hover:text-gray-600 focus:outline-none absolute top-0 right-0"
					>
						<RxCross2 className="h-5 w-5" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default PopUpToast;
