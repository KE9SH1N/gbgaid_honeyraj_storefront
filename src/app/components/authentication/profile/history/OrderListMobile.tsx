"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getOrderByUserDataFailure,
	getOrderByUserDataSuccess,
	selectOrderByUserDetailsData,
	selectOrderByUserPageNumber,
	setOrderByUserData,
	setOrderHistoryPageNumber,
} from "@/app/redux/features/auth/orderDetailsByUserSlice";
import EmptyOrderListTable from "../../common/EmptyOrderListTable";
import { formatDateMobile } from "@/app/lib/common/FormatDateAndTime";
import { getStatusClassName } from "@/app/lib/helper/getOrderStatusClassName";
import { getUserInfo } from "@/app/lib/common/AuthTokenDecoder";
import { getProductStart } from "@/app/redux/features/auth/userDetailsSlice";
import { fetchUserHistoryById } from "@/app/api/orderByUserApiService";
import { generatePagination } from "@/app/lib/helper/getPaginationRange";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { languageSelector } from "@/app/redux/features/intl/languageSlice";

const OrderListMobile = () => {
	const dispatch = useDispatch();
	const orderByUserData = useSelector(selectOrderByUserDetailsData);
	const orderByUserDataList = orderByUserData?.data;
	const selectedLanguage = useSelector(languageSelector);

	const totalPageNumber = orderByUserData?.totalPages;
	const pageNumber = useSelector(selectOrderByUserPageNumber);

	const decoded = getUserInfo() as any;
	const errorMessage = "Error";
	const userId = decoded?.id;

	useEffect(() => {
		const fetchUserDetails = async () => {
			dispatch(getProductStart());
			try {
				const userHistoryData = await fetchUserHistoryById(userId, pageNumber);
				dispatch(getOrderByUserDataSuccess(userHistoryData));
				dispatch(setOrderByUserData(userHistoryData));
			} catch (error) {
				dispatch(getOrderByUserDataFailure(errorMessage));
			}
		};
		if (userId && pageNumber) {
			fetchUserDetails();
		}
	}, [dispatch, userId, pageNumber]);

	const handlePageChange = (pageNo: any) => {
		if (pageNo > 0 && pageNo <= totalPageNumber) {
			dispatch(setOrderHistoryPageNumber(pageNo));
		}
	};

	const pagination = generatePagination(pageNumber, totalPageNumber);

	// For multi-language
	const t = useTranslations("userDashboard");
	return (
		<div className="mb-24">
			<div className="w-full overflow-x-auto min-h-[50vh]">
				<div className="my-6">
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr className="w-full text-left text-xs font-medium">
									<th className="py-3 px-1  text-gray-500 uppercase tracking-wider">
										{t("orderHistory.tableHead.date")}
									</th>
									<th className="py-3 px-1  text-gray-500 uppercase tracking-wider">
										{t("orderHistory.tableHead.order-id")}
									</th>
									<th className="py-3 px-1  text-gray-500 uppercase tracking-wider">
										{t("orderHistory.tableHead.order-status")}
									</th>
									<th className="py-3 px-1 w-[10%] md:w-[15%] text-gray-500 uppercase tracking-wider">
										{t("orderHistory.tableHead.action")}
									</th>
								</tr>
							</thead>
							{orderByUserDataList?.length > 0 && (
								<tbody className="w-full bg-white divide-y divide-gray-200 ">
									{orderByUserDataList.map((data: any) => (
										<tr
											key={data?.id}
											className="w-full text-left text-[10px] sm:text-xs capitalize "
										>
											<td className="py-2 px-1 whitespace-nowrap ">
												{formatDateMobile(data?.created_at)}
											</td>
											<td className=" py-2 px-1 whitespace-nowrap ">
												{data?.orderNumber}
											</td>

											<td className="w-[15%] sm:w-[18%] md:w-[30%] py-2 whitespace-nowrap">
												<p
													className={`w-full md:w-[50%] text-[10px] text-center sm:text-xs text-[#0B0B0B] p-1 px-2 bg-[#E6E6E6] rounded ${getStatusClassName(
														data?.storefrontOrderSingleStatus?.value
													)}`}
												>
													{data?.storefrontOrderSingleStatus?.name}
												</p>
											</td>
											<td className=" py-2 px-1 whitespace-nowrap ">
												<div className=" ct-flex-center text-center space-x-2">
													<Link
														href={`/auth/profile/orderNumber/${data?.orderNumber}`}
														className="ct-flex-center py-1 inner-border inner-border-[#F68821] w-8 rounded capitalize text-[10px] sm:text-xs font-medium text-[#F68821]"
													>
														<button className=" capitalize text-[8px]">
															view
														</button>
													</Link>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							)}
						</table>
						{orderByUserDataList?.length == 0 && <EmptyOrderListTable />}
					</div>
				</div>
			</div>

			{totalPageNumber > 1 && (
				<div>
					<ul className="flex space-x-2 text-xs">
						<li
							onClick={() => handlePageChange(pageNumber - 1)}
							className={`px-[9px] py-[3px] text-[10px] bg-white border border-gray-300 hover:border-sky-400 rounded-md text-gray-700 hover:bg-sky-400 hover:text-white cursor-pointer capitalize smooth-animation-mid`}
						>
							{t("orderHistory.pagination.previous")}
						</li>
						{pagination.map((page, index) =>
							page === "..." ? (
								<li key={index} className="px-[9px] py-[3px] text-gray-400">
									{page}
								</li>
							) : (
								<li
									key={index}
									onClick={() => handlePageChange(page)}
									className={`px-[9px] py-[3px] text-[10px] rounded-md cursor-pointer ${
										pageNumber === page
											? "bg-gbPrimaryColor border border-gbPrimaryColor text-white"
											: "border border-gray-300 text-gray-700"
									}`}
								>
									{page}
								</li>
							)
						)}
						<li
							onClick={() => handlePageChange(pageNumber + 1)}
							className={`px-[9px] py-[3px] text-[10px] bg-white border border-gray-300 hover:border-sky-400 rounded-md text-gray-700 hover:bg-sky-400 hover:text-white cursor-pointer smooth-animation-mid capitalize`}
						>
							{t("orderHistory.pagination.next")}
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default OrderListMobile;
