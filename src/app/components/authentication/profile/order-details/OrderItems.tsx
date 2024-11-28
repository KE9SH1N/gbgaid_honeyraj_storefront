"use client";
import { languageSelector } from "@/app/redux/features/intl/languageSlice";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import OrderProgress from "./OrderProgress";
import Link from "next/link";
import { selectOrderDetailsData } from "@/app/redux/features/auth/orderDetailsSlice";
import { formatDate } from "@/app/lib/common/FormatDateAndTime";
import { getBaseUrl } from "@/app/lib/helper/getBaseUrl";
import { useTranslations } from "next-intl";

const OrderItems = () => {
	const selectedLanguage = useSelector(languageSelector);
	const orderDetails = useSelector(selectOrderDetailsData);
	const orderDetailsData = orderDetails?.data;

	const tt = useTranslations("singleOrderDetails");

	return (
		<div className="w-full my-6 sm:px-2">
			{orderDetailsData?.map((order: any) => (
				<div key={order?.id} className="lg:mt-4 mt-0">
					<div>
						<div className=" ct-flex-start flex-col gap-y-4 ">
							<Link href={`/auth/profile`}>
								<p className=" capitalize text-xs px-3 py-1 rounded text-gbPrimaryColor border border-gray-400 cursor-pointer">
									back
								</p>
							</Link>
							<h2 className="text-2xl font-semibold capitalize">
								{tt("orderSummary.title")}
							</h2>
						</div>
						<div></div>
					</div>
					<div className=" text-sm mb-5">
						<p>
							{tt("orderSummary.order-id")}{" "}
							<span className=" text-gbPrimaryColor font-medium">
								{formatDate(order?.created_at)}
							</span>
						</p>
						<p>
							{tt("orderSummary.order-date")}{" "}
							<span className=" text-gbPrimaryColor font-medium">
								{order?.orderNumber}
							</span>
						</p>
					</div>
					<div className="mb-10">
						<OrderProgress />
					</div>
					<div className="w-full relative my-16">
						<div className="w-full">
							<h2 className="text-2xl font-semibold my-4 capitalize">
								{tt("orderSummary.product-list")}
							</h2>
						</div>
						<div
							className=" shadow-lg lg:shadow rounded overflow-x-hidden flex-grow max-h-[380px] lg:scrollbar-thin lg:scrollbar-thumb-gbCustomScrollThumbColor lg:scrollbar-track-[#FEF3E9]"
							id="scrollable-div"
						>
							{order?.order_info?.map((data: any) => (
								<ul
									key={data?.id}
									className="w-full ct-flex-start justify-between p-4 border-b last:border-b-0 "
								>
									<li className="ct-flex-start items-center w-full gap-x-4">
										<div className=" bg-gray-200 flex-shrink-0 border ">
											<Image
												src={`${getBaseUrl(true)}/${
													data?.product?.product_image
												}`}
												alt=""
												width={64}
												height={64}
											/>
										</div>

										<div className="w-[70%] text-sm text-[#0B0B0B] capitalize ct-flex-start flex-col gap-y-2">
											{selectedLanguage === "bn" ? (
												<h3 className="text-start">
													{data?.product?.product_title_bn}
												</h3>
											) : (
												<h3 className="text-start">
													{data?.product?.product_title_en}
												</h3>
											)}
											<p className="text-gbPrimaryColor">
												<span>{data?.product?.pack_size}</span>
											</p>
										</div>

										<div className="w-[30%] h-auto ct-flex-center">
											<div className="w-[30%] text-center">
												<span>{data?.productQuantity}</span>
											</div>
											<div className="w-[70%] text-right">
												<span>
													{data?.subTotal}{" "}
													{tt("orderSummary.shipping-address.tk")}
												</span>
											</div>
										</div>
									</li>
								</ul>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default OrderItems;
