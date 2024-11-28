"use client";
import React, { useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

import { Pagination } from "swiper/modules";
import SectionHead from "../util/SectionHead";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import { useTranslations } from "next-intl";
import { FaRegUserCircle } from "react-icons/fa";
const CustomerReview: React.FC = () => {
	const [slidesPerView, setSlidesPerView] = useState<number>(3);
	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);

	// For multi-language
	const t = useTranslations("sectionHead");
	const ts = useTranslations("customerReview");

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setSlidesPerView(1);
			} else if (window.innerWidth < 1024) {
				setSlidesPerView(2);
			} else {
				setSlidesPerView(2);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="ct-container mb-4">
			<div className="md:text-center py-2">
				<SectionHead headingText={t("customer-review")} />
			</div>
			<div className="lg:w-[90%] mx-auto">
				<Swiper
					slidesPerView={slidesPerView}
					spaceBetween={10}
					pagination={true}
					modules={[Pagination]}
					loop={false}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					className="mySwiper "
					id="customerReivew"
				>
					<SwiperSlide className="bg-componentBg rounded-md">
						<div className="p-6 h-52">
							<p className="h-32">
								ঘরেরবাজার থেকে আমি প্রথমবারের মতো মধু এবং খেজুর কিনেছি। মধুর মান
								অসাধারণ এবং খেজুরগুলো একদম টাটকা। এত সুস্বাদু প্রাকৃতিক খাবার
								পাওয়ার জন্য আমি খুবই খুশি। অবশ্যই আবারও অর্ডার করবো।
							</p>
							<div
								ref={imageRef}
								className="ct-flex-start items-center space-x-2 pt-2 pb-6"
							>
								<FaRegUserCircle className="text-3xl" />
								<span className=" font-medium text-xs">রিয়াজুল করিম</span>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className="bg-componentBg rounded-md">
						<div className="p-6 h-52">
							<p className=" h-32">
								ঘরেরবাজারের ঘি এবং বাদাম আমার পরিবারের সবাই খুব পছন্দ করেছে। ঘি
								এর স্বাদ এবং মান খুবই ভালো। সবকিছুই প্রাকৃতিক এবং বিশুদ্ধ।
								অনলাইনে এত ভালো সার্ভিস আর প্রডাক্ট পাওয়া সত্যিই বিরল। ধন্যবাদ
								ঘোরেরবাজার।
							</p>
							<div className="ct-flex-start items-center space-x-2 pt-2 pb-6">
								<FaRegUserCircle className="text-3xl" />
								<span className=" font-medium text-xs">সাইফুল মির্জা</span>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide className="bg-componentBg rounded-md">
						<div className="p-6 h-52">
							<p className="h-32">
								I recently bought honey nuts from Ghorerbazar. The quality is
								fantastic and everything tastes so fresh and natural. The honey
								is pure and the nuts are crunchy and delicious. Highly recommend
								their products for anyone looking for natural and healthy food
								options.
							</p>
							<div className="ct-flex-start items-center space-x-2 pt-2 pb-6">
								<FaRegUserCircle className="text-3xl" />
								<span className=" font-medium text-xs">Kazi Ibrahim</span>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
};

export default CustomerReview;
