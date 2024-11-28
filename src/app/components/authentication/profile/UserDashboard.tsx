"use client";
import React, { useState } from "react";
import ProfileSideMenu from "./ProfileSideMenu";
import UserProfile from "./user-information/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import OrderHistory from "./history/OrderHistory";
import UserOrderStatus from "./order-status/UserOrderStatus";
import MobileUserMenu from "./MobileUserMenu";
import UserProfileHead from "./user-information/UserProfileHead";
import UserProfileBio from "./user-information/UserProfileBio";
import UserProfileDropdownFilter from "./history/UserProfileDropdownFilter";
import WriteReview from "./user-review/WriteReview";
import SetUserPin from "./user-pin/SetUserPin";
import {
	resetActiveUserTab,
	setActiveUserTabMobile,
} from "@/app/redux/features/auth/userDashboardSlice";
import { selectOrderByUserDetailsData } from "@/app/redux/features/auth/orderDetailsByUserSlice";
import EmptyOrderStatus from "./EmptyOrderStatus";
import UserProfileEdit from "./user-information/UserProfileEdit";
import OrderHistoryMobile from "./history/OrderHistoryMobile";

const UserDashboard = () => {
	const dispatch = useDispatch();
	const [editProfile, setEditProfile] = useState<boolean>(false);
	const [ViewOrderDetails, setViewOrderDetails] = useState<boolean>(false);
	const [selectedOrder, setSelectedOrder] = useState<any>(null);
	const activeUserDashboardTab = useSelector(
		(state: any) => state.userdashboardtab.activeUserDashboardTab
	);

	const activeUserDashboardTabMobile = useSelector(
		(state: any) => state.userdashboardtab.activeUserDashboardTabMobile
	);

	const orderByUserData = useSelector(selectOrderByUserDetailsData);

	const handleViewOrderDetails = (order: any) => {
		setSelectedOrder(order);
		setViewOrderDetails(!ViewOrderDetails);
	};

	const renderUserDashboardTab = () => {
		if (activeUserDashboardTab === "profile") {
			return <UserProfile />;
		}
		// else if (activeUserDashboardTab === "orderStatus") {
		// 	if (orderByUserData?.data?.length == 0) {
		// 		return <EmptyOrderStatus />;
		// 	} else {
		// 		return <UserOrderStatus />;
		// 	}
		// }
		else if (activeUserDashboardTab === "history") {
			return <OrderHistory />;
		} else if (activeUserDashboardTab === "review") {
			return <WriteReview />;
		} else if (activeUserDashboardTab === "pin") {
			return <SetUserPin />;
		} else {
			return;
		}
	};

	const handleUserSideMenuTab = (tabName: string) => {
		dispatch(setActiveUserTabMobile(tabName));
	};

	const renderUserDashboardTabMobile = () => {
		let activeTabContent;

		if (activeUserDashboardTabMobile === "profile") {
			if (!editProfile) {
				activeTabContent = <UserProfileBio />;
			} else {
				activeTabContent = <UserProfileEdit />;
			}
		} else if (activeUserDashboardTabMobile === "history") {
			activeTabContent = (
				<OrderHistoryMobile
					handleViewOrderDetails={handleViewOrderDetails}
					order={selectedOrder}
					ViewOrderDetails={ViewOrderDetails}
				/>
			);
		} else if (activeUserDashboardTabMobile === "orderStatus") {
			activeTabContent = <UserOrderStatus />;
		}
		// else if (activeUserDashboardTabMobile === "review") {
		// 	activeTabContent = <WriteReview />;
		// }
		else if (activeUserDashboardTabMobile === "pin") {
			activeTabContent = <SetUserPin />;
		} else {
			activeTabContent = null;
		}

		return (
			<div>
				{activeUserDashboardTabMobile === null ? null : (
					<>
						{!ViewOrderDetails ? (
							<div>
								<UserProfileDropdownFilter />
								<UserProfileHead
									handleUserProfileEdit={handleUserProfileEdit}
									editProfile={editProfile}
								/>
							</div>
						) : (
							""
						)}
					</>
				)}

				{activeTabContent}
			</div>
		);
	};

	let showProfileMenu = "";
	if (
		activeUserDashboardTabMobile === "profile" ||
		activeUserDashboardTabMobile === "history" ||
		activeUserDashboardTabMobile === "orderStatus" ||
		activeUserDashboardTabMobile === "review" ||
		activeUserDashboardTabMobile === "pin"
	) {
		showProfileMenu += " hidden";
	}

	const handleUserProfileEdit = () => {
		setEditProfile(!editProfile);
		dispatch(resetActiveUserTab());
	};
	return (
		<div className="ct-container overflow-x-hidden my-4">
			<div className="hidden lg:ct-flex-center lg:justify-start lg:items-start lg:space-x-6">
				<ProfileSideMenu />
				<div className="hidden lg:block w-[80%]">
					{renderUserDashboardTab()}
				</div>
			</div>
			<div className="lg:hidden">
				<div className="w-full">
					<div className={showProfileMenu}>
						{!editProfile ? (
							<div
								className={`w-full mb-24 ${ViewOrderDetails ? "hidden" : ""}`}
							>
								<UserProfileHead
									handleUserProfileEdit={handleUserProfileEdit}
									editProfile={editProfile}
								/>

								<MobileUserMenu handleUserSideMenuTab={handleUserSideMenuTab} />
							</div>
						) : (
							<div className="w-full mb-24">
								<UserProfileEdit
									handleUserProfileEdit={handleUserProfileEdit}
								/>
							</div>
						)}
					</div>
					<div className="w-full">{renderUserDashboardTabMobile()}</div>
				</div>
			</div>
		</div>
	);
};

export default UserDashboard;
