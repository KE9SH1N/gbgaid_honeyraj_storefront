"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../../lib/helper/getBaseUrl";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { selectProductDetailsData } from "../../redux/features/product/productdetailsSlice";

const ProductImageSlider = () => {
	const selectedLanguage = useSelector(languageSelector);

	const productData = useSelector(selectProductDetailsData);

	const productMultiImage = productData?.product_gallery;
	return (
		<>
			<Swiper
				pagination={{
					type: "fraction",
				}}
				navigation={true}
				loop={true}
				autoplay={{
					delay: 3000,
					disableOnInteraction: true,
				}}
				modules={[Pagination, Navigation, Autoplay]}
				className="mySwiper"
			>
				{productMultiImage?.map((item: any) => (
					<SwiperSlide key={item}>
						<div className="w-full">
							<Image
								src={`${getBaseUrl(true)}/${item}`}
								alt={
									selectedLanguage === "bn"
										? productData?.product_title_bn
										: productData?.product_title_en
								}
								width={328}
								height={328}
								className="w-full mx-auto"
								onDragStart={(e) => e.preventDefault()}
							/>
							{/* <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div> */}
							{/* <div className="absolute inset-0 bg-black/10"></div> */}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default ProductImageSlider;
