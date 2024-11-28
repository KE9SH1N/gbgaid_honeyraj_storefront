"use client";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import CustomButton from "../util/CustomButton";
import { HiMiniArrowUpRight } from "react-icons/hi2";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { fetchSliderData } from "../../api/productSliderApiService";
import { selectAllSliders } from "../../redux/features/product/sliderSlice";
import { sliderItem } from "../../types/sliderType";
import { getBaseUrl } from "../../lib/helper/getBaseUrl";

const HeroSlider: React.FC = () => {
	const dispatch = useDispatch();
	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);

	// For multi-language
	const t = useTranslations("heroSliderButtons");

	const selectedLanguage = useSelector(languageSelector);

	// For Data Fetch
	useEffect(() => {
		dispatch(fetchSliderData() as any);
	}, [dispatch]);

	const heroSlider = useSelector(selectAllSliders);

	// Active Slider Filter
	const activeSlider = heroSlider.filter(
		(slider: sliderItem) => slider?.isActive === true
	);

	return (
		<div>
			<Swiper
				key={activeSlider.length}
				navigation={true}
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Pagination, Navigation, Autoplay]}
				loop={true}
				autoplay={{
					delay: 3000,
					disableOnInteraction: true,
					pauseOnMouseEnter: true,
				}}
				className="mySwiper"
			>
				{activeSlider.map((slider: sliderItem) => (
					<SwiperSlide key={slider.id}>
						<div className="relative">
							<Link href={`${slider?.url}`}>
								<div
									ref={imageRef}
									className="overflow-hidden max-w-[1500px] max-h-[750px]"
								>
									<Image
										src={`${getBaseUrl(true)}/${slider?.image}`}
										// src="/image/hero_slider/slider-1.jpg"
										alt={`${slider?.url}`}
										width={1500}
										height={750}
										priority={true}
										onDragStart={(e) => e.preventDefault()}
										className="w-full h-auto object-cover"
									/>
									{/* <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div> */}
								</div>
							</Link>
							<div className="hidden md:flex md:w-[20%] absolute top-[75%] left-[5%]">
								<Link href={`/products`}>
									<div className="bg-gbPrimaryColor py-2 px-5 w-full ct-flex-center gap-x-2 rounded capitalize text-white relative">
										<CustomButton buttonText={t("view-all")} />

										<HiMiniArrowUpRight className="text-xl" />
									</div>
								</Link>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default HeroSlider;
