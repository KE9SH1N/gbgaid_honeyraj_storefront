import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import { selectOrderDetailsData } from "@/app/redux/features/auth/orderDetailsSlice";
import { selectUserDetailsData } from "@/app/redux/features/auth/userDetailsSlice";
import { languageSelector } from "@/app/redux/features/intl/languageSlice";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { IoCallOutline, IoCopyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../common/Modal";
import { fetchOrderDetailsById } from "@/app/api/orderDetailsApiService";
import {
	setMessage,
	setOpen,
} from "@/app/redux/features/notification/toasterSlice";

const OrderProgress = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const userData = useSelector(selectUserDetailsData);
	const selectedLanguage = useSelector(languageSelector);

	const orderDetails = useSelector(selectOrderDetailsData);
	const orderDetailsData = orderDetails.data;

	const singleOrderStatus = orderDetailsData[0]?.orderStatus?.value;

	const [buttonText, setButtonText] = useState("copy");
	const [telLink, setTelLink] = useState("tel:09642922922");
	const [isModalOpen, setModalOpen] = useState<boolean>(false);

	const t = useTranslations("mobileMenu");
	const tt = useTranslations("singleOrderDetails");

	const storeFrontOrderStatus = orderDetailsData[0]?.storefrontOrderStatus;
	const orderNumber = orderDetailsData[0].orderNumber;

	const [submitValue, setSubmitValue] = useState(0);
	const [appredValue, setAppredValue] = useState(0);
	const [holdValue, setHoldValue] = useState(0);
	const [shippedValue, setShippedValue] = useState(0);
	const [deliveredValue, setDeliveredValue] = useState(0);
	const [canceledValue, setCanceledValue] = useState(0);

	useEffect(() => {
		setSubmitValue(0);
		setAppredValue(0);
		setHoldValue(0);
		setShippedValue(0);
		setDeliveredValue(0);
		setCanceledValue(0);

		if (storeFrontOrderStatus && storeFrontOrderStatus.length > 0) {
			let shouldSetValues = false;
			storeFrontOrderStatus.forEach((order: any) => {
				const orderStatus = order.name;
				const orderStatusValue = order.isTrue;

				if (orderStatusValue === 1) {
					shouldSetValues = true;
					if (orderStatus === "Submitted") {
						setSubmitValue(1);
					}
					if (orderStatus === "Approved") {
						setSubmitValue(1);
						setAppredValue(1);
					}
					if (orderStatus === "Hold") {
						setSubmitValue(1);
						setAppredValue(1);
						setHoldValue(1);
					}
					if (orderStatus === "Shipped") {
						setSubmitValue(1);
						setAppredValue(1);
						setHoldValue(0);
						setShippedValue(1);
					}
					if (orderStatus === "Delivered") {
						setSubmitValue(1);
						setAppredValue(1);
						setHoldValue(0);
						setShippedValue(1);
						setDeliveredValue(1);
					}
					if (orderStatus === "Cancel") {
						setCanceledValue(1);
						setSubmitValue(0);
						setAppredValue(0);
						setHoldValue(0);
						setShippedValue(0);
						setDeliveredValue(0);
					}
				}
			});
			if (!shouldSetValues) {
				setSubmitValue(0);
				setAppredValue(0);
				setHoldValue(0);
				setShippedValue(0);
				setDeliveredValue(0);
			}
		}
	}, [storeFrontOrderStatus]);

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

	const closeCancelOrderModal = () => {
		setModalOpen(false);
	};

	const handleCancelOrder = async () => {
		try {
			const token = localStorage.getItem("accessToken");
			if (!token) {
				console.log("No access token found.");
				return;
			}
			const cancelOrderData = {
				isAction: true,
				cancelWithReason: true,
				orderStatusValue: 0,
				orderStatus: {
					name: "Canceled",
					value: "0",
				},
			};

			const response = await axios.patch(
				`${getBaseUrl(true)}/order/${orderDetailsData[0].id}`,
				cancelOrderData
			);

			if (response) {
				router.push(`/auth/profile/orderNumber/${orderNumber}`);
				closeCancelOrderModal();
				setCanceledValue(1);
				setSubmitValue(0);
				dispatch(setOpen(true));
				dispatch(
					setMessage({
						message: tt("orderSummary.cancelOrderModal.toastMesg"),
						type: "success",
					})
				);
			} else {
				console.log("Order number not found in response.");
			}
		} catch (error: any) {
			console.error("An error occurred while canceling the order:", error);
		} finally {
		}
	};

	const handleCancelBtn = () => {
		setModalOpen(!isModalOpen);
	};

	return (
		<div className="my-5 relative">
			<div className="w-full ct-flex-start lg:ct-flex-between flex-col lg:flex-row">
				<div className=" my-3">
					<div className="text-sm capitalize">
						<span>{tt("orderSummary.hello")}&nbsp;</span>
						<span className=" font-medium">
							{userData?.name} <span>!</span>
						</span>
					</div>

					<p className=" text-sm">{tt("orderSummary.mesg")}</p>
				</div>
				<div>
					{singleOrderStatus === 1 && canceledValue === 0 ? (
						<button
							onClick={handleCancelBtn}
							className="py-2 px-6 rounded capitalize text-white font-light text-xs bg-gbInactiveColor"
						>
							cancel order
						</button>
					) : (
						<div className="w-full ct-flex-start flex-col gap-2">
							<p className=" text-gray-600 text-sm capitalize">
								{tt("orderSummary.cs-mesg")}
							</p>
							<div className="ct-flex-start space-x-2">
								<span className=" bg-gbCustomScrollThumbColor text-sm ct-flex-center gap-x-1 w-fit rounded px-2 py-1">
									<IoIosCall className="text-lg" />
									{t("support.cs-number")}
								</span>
								<button
									onClick={handleCallClick}
									className="flex items-center gap-x-1 border border-gray-300 px-2 py-[3px] rounded text-green-500"
								>
									<IoCallOutline className="text-xl" />
									<span className="capitalize text-sm">
										{t("support.callForOrder.call")}
									</span>
								</button>
								<button
									onClick={handleCopy}
									className={`ct-flex-center gap-x-1 border  ${
										buttonText === "copied!"
											? "border-gbActiveColor"
											: "border-gray-300"
									} px-2 py-[3px] rounded text-slate-400 text-sm`}
								>
									<IoCopyOutline
										className={`text-sm ${
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
					)}
				</div>
			</div>
			<div className="my-3">
				{canceledValue == 1 ? (
					<p className="text-sm lg:text-lg capitalize">
						<span>{tt("orderSummary.order-status")}:</span>
						<span className="text-gbInactiveColor text-sm lg:text-lg px-3">
							Canceled
						</span>
					</p>
				) : holdValue == 1 ? (
					<p className="text-lg capitalize">
						<span>{tt("orderSummary.order-status")}:</span>
						<span className="text-gbPrimaryColor text-lg px-3">Hold</span>
					</p>
				) : (
					<h3 className="text-2xl font-semibold my-4 capitalize">
						{tt("orderSummary.order-status")}
					</h3>
				)}
			</div>
			<div className="my-5">
				<div
					className={`${
						canceledValue == 1 || holdValue == 1 ? "hidden" : "flex"
					} items-center w-[70%] md:w-[80%] lg:w-[90%] mx-auto`}
				>
					{/* Submitted */}
					<div className="flex items-center">
						<div className="relative w-full">
							<div
								className={`w-4 h-4 rounded-full flex items-center justify-center ${
									submitValue == 1 ? "bg-gbActiveColor" : "bg-gray-300"
								}`}
							></div>
							<p className="w-20 absolute top-6 left-[-20px] text-xs capitalize">
								submitted
							</p>
						</div>
					</div>
					<div
						className={`flex-grow h-1 ${
							appredValue == 1 ? "bg-gbActiveColor" : "bg-gray-300"
						}`}
					></div>
					{/* Approved */}
					<div className="flex items-center">
						<div className="relative w-full">
							<div
								className={`w-4 h-4 rounded-full flex items-center justify-center ${
									appredValue == 1 ? "bg-gbActiveColor" : "bg-gray-300"
								}`}
							></div>
							<p className="w-20 absolute top-6 left-[-20px] text-xs capitalize">
								approved
							</p>
						</div>
					</div>
					<div
						className={`flex-grow h-1 ${
							shippedValue == 1 ? "bg-gbActiveColor" : "bg-gray-300"
						}`}
					></div>
					{/* Shipped */}
					<div className="flex items-center">
						<div className="relative">
							<div
								className={`w-4 h-4 rounded-full flex items-center justify-center ${
									shippedValue == 1 ? "bg-gbActiveColor" : "bg-gray-300"
								}`}
							></div>
							<span className="w-20 absolute top-6 left-[-15px] text-xs capitalize">
								shipped
							</span>
						</div>
					</div>
					<div
						className={`flex-grow h-1 ${
							deliveredValue == 1 ? "bg-gbActiveColor" : "bg-gray-300"
						}`}
					></div>
					{/* Delivered */}
					<div className="flex items-center">
						<div className="relative">
							<div
								className={`w-4 h-4 rounded-full flex items-center justify-center ${
									deliveredValue == 1 ? "bg-gbActiveColor" : "bg-gray-300"
								}`}
							></div>
							<span className="w-20 absolute top-6 left-[-15px] text-xs capitalize">
								delivered
							</span>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`smooth-animation-high ${
					isModalOpen
						? "opacity-100 fixed inset-0 z-50 bg-black bg-opacity-50"
						: "opacity-0 pointer-events-none bg-transparent bg-opacity-0"
				}`}
			>
				<Modal
					onClose={closeCancelOrderModal}
					handleCancelOrder={handleCancelOrder}
				/>
			</div>
		</div>
	);
};

export default OrderProgress;
