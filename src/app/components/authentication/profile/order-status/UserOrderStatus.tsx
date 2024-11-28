import React from "react";
import SectionHead from "../../../util/SectionHead";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { selectOrderByUserDetailsData } from "@/app/redux/features/auth/orderDetailsByUserSlice";

const getOrderStatusClasses = (statusValue: any) => {
	const baseClass = "bg-[#EDEDED]";
	const defaultClass = "bg-[#C5C5C5]";
	const baseInnerClass = "bg-[#BAF8C3]";
	const defaultInnerClass = "bg-[#15B22E]";
	const iconActiveClass = "text-white";
	const iconInactiveClass = "text-[#8A8A8A]";
	const progressActiveClass = "bg-[#BAF8C3]";
	const progressInactiveClass = "bg-[#FBCFA6]";

	const classes = {
		statusClass: {
			submitted: baseClass,
			approved: baseClass,
			shipped: baseClass,
			delivered: baseClass,
		},
		innerStatusClass: {
			submitted: defaultClass,
			approved: defaultClass,
			shipped: defaultClass,
			delivered: defaultClass,
		},

		iconStatusClass: {
			submitted: iconInactiveClass,
			approved: iconInactiveClass,
			shipped: iconInactiveClass,
			delivered: iconInactiveClass,
		},
		progressStatusClass: {
			submitted: progressInactiveClass,
			approved: progressInactiveClass,
			shipped: progressInactiveClass,
			delivered: progressInactiveClass,
		},
	};

	if (statusValue === 1) {
		classes.statusClass.submitted = baseInnerClass;
		classes.innerStatusClass.submitted = defaultInnerClass;
		classes.iconStatusClass.submitted = iconActiveClass;
	}
	if (statusValue === "2") {
		// for submit status
		classes.statusClass.submitted = baseInnerClass;
		classes.innerStatusClass.submitted = defaultInnerClass;
		classes.iconStatusClass.submitted = iconActiveClass;
		// for approved status
		classes.statusClass.approved = baseInnerClass;
		classes.innerStatusClass.approved = defaultInnerClass;
		classes.iconStatusClass.submitted = iconActiveClass;
		classes.progressStatusClass.approved = progressActiveClass;
	}
	if (statusValue === "8") {
		// for submit status
		classes.statusClass.submitted = baseInnerClass;
		classes.innerStatusClass.submitted = defaultInnerClass;
		classes.iconStatusClass.submitted = iconActiveClass;
		// for approved status
		classes.statusClass.approved = baseInnerClass;
		classes.innerStatusClass.approved = defaultInnerClass;
		classes.iconStatusClass.submitted = iconActiveClass;
		classes.progressStatusClass.approved = progressActiveClass;
		// for shipped status
		classes.statusClass.shipped = baseInnerClass;
		classes.innerStatusClass.shipped = defaultInnerClass;
		classes.iconStatusClass.shipped = iconActiveClass;
		classes.progressStatusClass.shipped = progressActiveClass;
	}
	if (statusValue === "9") {
		// for submit status
		classes.statusClass.submitted = baseInnerClass;
		classes.innerStatusClass.submitted = defaultInnerClass;
		classes.iconStatusClass.submitted = iconActiveClass;
		// for approved status
		classes.statusClass.approved = baseInnerClass;
		classes.innerStatusClass.approved = defaultInnerClass;
		classes.iconStatusClass.submitted = iconActiveClass;
		classes.progressStatusClass.approved = progressActiveClass;
		// for shipped status
		classes.statusClass.shipped = baseInnerClass;
		classes.innerStatusClass.shipped = defaultInnerClass;
		classes.iconStatusClass.shipped = iconActiveClass;
		classes.progressStatusClass.shipped = progressActiveClass;
		// for delivered status
		classes.statusClass.delivered = baseInnerClass;
		classes.innerStatusClass.delivered = defaultInnerClass;
		classes.iconStatusClass.delivered = iconActiveClass;
	}

	return classes;
};

const UserOrderStatus = () => {
	const orderByUserData = useSelector(selectOrderByUserDetailsData);
	const orderByUserDataList = orderByUserData?.data;

	// Assuming orders are sorted by createdAt in descending order

	const latestOrder = orderByUserDataList?.reduce((latest: any, order: any) => {
		return new Date(order?.created_at) > new Date(latest?.created_at)
			? order
			: latest;
	});

	const {
		statusClass,
		innerStatusClass,
		iconStatusClass,
		progressStatusClass,
	} = getOrderStatusClasses(latestOrder?.orderStatus?.value);

	return (
		<div className="">
			<SectionHead headingText="current order status" />
			<div className="capitalize text-lg my-6">
				<p>
					order id:
					<span className="text-[#F68821]">{latestOrder?.orderNumber}</span>
				</p>
			</div>

			<div className="lg:my-6 my-12">
				<div className="ct-flex-between">
					<div className="relative">
						<div
							className={`w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 ${statusClass.submitted} ct-flex-center rounded-full`}
						>
							<div
								className={`w-10 h-10 md:w-16 md:h-16 lg:w-24 lg:h-24 ${innerStatusClass.submitted} ct-flex-center rounded-full`}
							>
								<BsFillCartCheckFill
									className={`text-2xl md:text-3xl lg:text-5xl ${iconStatusClass.submitted}`}
								/>
							</div>
						</div>
						<p className="text-sm lg:text-lg text-center my-4 capitalize font-semibold">
							submitted
						</p>
						<div
							className={`absolute top-[28%] md:top-[30%] lg:top-[35%] md:left-full left-[95%] lg:w-[87%] md:w-[200%] w-full h-1 -z-10 ${progressStatusClass.approved}`}
						></div>
					</div>

					<div className="relative">
						<div
							className={`w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 ${statusClass.approved} ct-flex-center rounded-full`}
						>
							<div
								className={`w-10 h-10 md:w-16 md:h-16 lg:w-24 lg:h-24 ${innerStatusClass.approved} ct-flex-center rounded-full`}
							>
								<FaHandshake
									className={`text-2xl md:text-3xl lg:text-5xl ${iconStatusClass.submitted}`}
								/>
							</div>
						</div>
						<p className="text-sm lg:text-lg text-center my-4 capitalize font-semibold">
							approved
						</p>
						<div
							className={`absolute top-[28%] md:top-[30%] lg:top-[35%] md:left-full left-[90%] lg:w-[87%] md:w-[200%] w-full h-1 -z-10 ${progressStatusClass.shipped}`}
						></div>
					</div>

					<div className="relative">
						<div
							className={`w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 ${statusClass.shipped} ct-flex-center rounded-full`}
						>
							<div
								className={`w-10 h-10 md:w-16 md:h-16 lg:w-24 lg:h-24 ${innerStatusClass.shipped} ct-flex-center rounded-full`}
							>
								<MdLocalShipping
									className={`text-2xl md:text-3xl lg:text-5xl ${iconStatusClass.submitted}`}
								/>
							</div>
						</div>
						<p className="text-sm lg:text-lg text-center my-4 capitalize font-semibold">
							shipped
						</p>
						<div
							className={`absolute top-[28%] md:top-[30%] lg:top-[35%] md:left-full left-[95%] lg:w-[87%] md:w-[200%] w-full h-1 -z-10 ${progressStatusClass.delivered}`}
						></div>
					</div>

					<div>
						<div
							className={`w-16 h-16 md:w-20 md:h-20 lg:w-32 lg:h-32 ${statusClass.delivered} ct-flex-center rounded-full`}
						>
							<div
								className={`w-10 h-10 md:w-16 md:h-16 lg:w-24 lg:h-24 ${innerStatusClass.delivered} ct-flex-center rounded-full`}
							>
								<FaRegCheckCircle
									className={`text-2xl md:text-3xl lg:text-5xl ${iconStatusClass.submitted}`}
								/>
							</div>
						</div>
						<p className="text-sm lg:text-lg text-center my-4 capitalize font-semibold">
							delivered
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserOrderStatus;
