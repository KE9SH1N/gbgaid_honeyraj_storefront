"use client";
import { formatDate } from "../../../../lib/common/FormatDateAndTime";
import {
	getOrderByUserDataFailure,
	getOrderByUserDataSuccess,
	selectOrderByUserDetailsData,
	selectOrderByUserPageNumber,
	setOrderByUserData,
	setOrderHistoryPageNumber,
} from "@/app/redux/features/auth/orderDetailsByUserSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyOrderListTable from "../../common/EmptyOrderListTable";
import { getStatusClassName } from "@/app/lib/helper/getOrderStatusClassName";
import { fetchUserHistoryById } from "@/app/api/orderByUserApiService";
import { getUserInfo } from "@/app/lib/common/AuthTokenDecoder";
import { getProductStart } from "@/app/redux/features/auth/userDetailsSlice";
import { generatePagination } from "@/app/lib/helper/getPaginationRange";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { languageSelector } from "@/app/redux/features/intl/languageSlice";

const OrderListTable = () => {
	const dispatch = useDispatch();
	const orderByUserData = useSelector(selectOrderByUserDetailsData);
	const orderByUserDataList = orderByUserData?.data;
	const orderNumber = orderByUserDataList?.orderNumber;

	const totalPageNumber = orderByUserData?.totalPages;
	const pageNumber = useSelector(selectOrderByUserPageNumber);
	const selectedLanguage = useSelector(languageSelector);

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
		<div>
			<div className="overflow-x-auto min-h-[60vh]">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr className="w-full text-left capitalize text-xs font-medium">
							<th className="w-[20%] py-3 px-2 text-gray-500 uppercase tracking-wider">
								{t("orderHistory.tableHead.date")}
							</th>
							<th className="w-[15%] py-3 px-2 text-gray-500 uppercase tracking-wider">
								{t("orderHistory.tableHead.order-id")}
							</th>
							<th className="w-[20%] py-3 px-2 text-gray-500 uppercase tracking-wider">
								{t("orderHistory.tableHead.total-amount")}
							</th>
							<th className="w-[20%] py-3 px-2 text-gray-500 uppercase tracking-wider">
								{t("orderHistory.tableHead.order-status")}
							</th>
							<th className="w-[25%] py-3 px-2 text-gray-500 uppercase tracking-wider">
								{t("orderHistory.tableHead.action")}
							</th>
						</tr>
					</thead>
					{orderByUserDataList?.length > 0 && (
						<tbody className="w-full bg-white divide-y divide-gray-200 ">
							{orderByUserDataList.map((data: any) => (
								<tr key={data?.id} className="w-full text-left capitalize ">
									<td className="w-[20%] py-3 px-2 text-sm whitespace-nowrap ">
										{formatDate(data?.created_at)}
									</td>
									<td className="w-[15%]  py-3 px-2 text-sm whitespace-nowrap ">
										{data?.orderNumber}
									</td>
									<td className="w-[20%] py-3 px-2 text-sm whitespace-nowrap ">
										{data?.last_transaction?.totalPurchaseAmount}
									</td>
									<td className="w-[20%] py-3 px-2 text-sm whitespace-nowrap">
										<p
											className={`w-full md:w-[50%] text-[10px] text-center sm:text-xs ${getStatusClassName(
												data?.storefrontOrderSingleStatus?.value
											)}  p-1 px-2 rounded`}
										>
											{data?.storefrontOrderSingleStatus?.name}
										</p>
									</td>
									<td className="w-[25%] py-3 px-2 whitespace-nowrap ">
										<div className="ct-flex-start text-center space-x-2">
											{/* <div className=" w-[30%] inner-border inner-border-[#F68821] p-1 rounded capitalize text-xs font-medium text-[#F68821]">
												<button className=" capitalize">cancel</button>
											</div> */}
											<Link
												href={`/auth/profile/orderNumber/${data?.orderNumber}`}
												className="w-[30%] inner-border inner-border-[#F68821] p-1 rounded capitalize text-xs font-medium text-[#F68821]"
											>
												<button className=" capitalize">view</button>
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

			{totalPageNumber > 1 && (
				<div>
					<ul className="flex space-x-2 text-xs my-12">
						<li
							onClick={() => handlePageChange(pageNumber - 1)}
							className={`px-3 py-1 bg-white border border-gray-300 hover:border-sky-400 rounded-md text-gray-700 hover:bg-sky-400 hover:text-white cursor-pointer capitalize smooth-animation-mid`}
						>
							{t("orderHistory.pagination.previous")}
						</li>
						{pagination.map((page, index) =>
							page === "..." ? (
								<li key={index} className="px-3 py-1 text-gray-400">
									{page}
								</li>
							) : (
								<li
									key={index}
									onClick={() => handlePageChange(page)}
									className={`px-3 py-1 rounded-md cursor-pointer ${
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
							className={`px-3 py-1 bg-white border border-gray-300 hover:border-sky-400 rounded-md text-gray-700 hover:bg-sky-400 hover:text-white cursor-pointer smooth-animation-mid capitalize`}
						>
							{t("orderHistory.pagination.next")}
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default OrderListTable;
