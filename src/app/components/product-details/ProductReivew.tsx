import React from "react";
import StarRating from "../util/StarRating";
import { useTranslations } from "next-intl";

const ProductReivew = () => {
	// For multi-language
	const ts = useTranslations("reviewRating");
	return (
		<div className="my-6">
			<div className="py-6">
				<div className="ct-flex-center flex-col gap-y-2">
					<span className=" font-bold text-6xl">{ts("rating")}</span>
					<div className="text-sm">
						<StarRating />
					</div>
					<p className="text-[#666666] capitalize">{ts("review-text")}</p>
				</div>
				<div className="w-full md:w-[50%] mx-auto pt-6">
					<div className="ct-flex-center md:gap-x-4 w-full mx-auto">
						<div className="w-[30%]">
							<h3 className=" font-semibold text-[13px] md:text-base text-[#666666] capitalize">
								{ts("excellent")}
							</h3>
						</div>
						<div className="w-[70%] mx-auto bg-gray-200 rounded-lg overflow-hidden">
							<div className="bg-gbActiveColor w-[90%] text-white rounded-r-full py-1 text-xs text-center"></div>
						</div>
					</div>
					<div className="ct-flex-center md:gap-x-4 w-full mx-auto ">
						<div className="w-[30%] ">
							<h3 className=" font-semibold text-[13px] md:text-base text-[#666666] capitalize">
								{ts("good")}
							</h3>
						</div>
						<div className="w-[70%] mx-auto bg-gray-200 rounded-lg overflow-hidden">
							<div className="bg-[#4DCB4D] w-[65%] text-white rounded-r-full py-1 text-xs text-center"></div>
						</div>
					</div>

					<div className="ct-flex-center md:gap-x-4 w-full mx-auto ">
						<div className="w-[30%] ">
							<h3 className=" font-semibold text-[13px] md:text-base text-[#666666] capitalize">
								{ts("avg")}
							</h3>
						</div>
						<div className="w-[70%] mx-auto bg-gray-200 rounded-lg overflow-hidden">
							<div className="bg-[#FBCFA6] w-[45%] text-white rounded-r-full py-1 text-xs text-center"></div>
						</div>
					</div>

					<div className="ct-flex-center md:gap-x-4 w-full mx-auto ">
						<div className="w-[30%] ">
							<h3 className=" font-semibold text-[13px] md:text-base text-[#666666] capitalize">
								{ts("bellow-avg")}
							</h3>
						</div>
						<div className="w-[70%] mx-auto bg-gray-200 rounded-lg overflow-hidden">
							<div className="bg-gbPrimaryColor w-[30%] text-white rounded-r-full py-1 text-xs text-center"></div>
						</div>
					</div>

					<div className="ct-flex-center md:gap-x-4 w-full mx-auto ">
						<div className="w-[30%] ">
							<h3 className=" font-semibold text-[13px] md:text-base text-[#666666] capitalize">
								{ts("bad")}
							</h3>
						</div>
						<div className="w-[70%] mx-auto bg-gray-200 rounded-lg overflow-hidden">
							<div className="bg-gbInactiveColor w-[10%] text-white rounded-r-full py-1 text-xs text-center"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductReivew;
