"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import SectionHead from "../util/SectionHead";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const CollectionList = () => {
	const [slidesPerView, setSlidesPerView] = useState<number>(1);
	// For multi-language
	const t = useTranslations("sectionHead");
	const ts = useTranslations("collectionList");
	const selectedLanguage = useSelector(languageSelector);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 768) {
				setSlidesPerView(2);
			} else if (window.innerWidth < 1024) {
				setSlidesPerView(4);
			} else {
				setSlidesPerView(5);
			}
		};

		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="ct-container">
			<SectionHead headingText={t("collections")} />
			<div className="my-8">
				<Swiper
					slidesPerView={slidesPerView}
					spaceBetween={10}
					navigation={true}
					modules={[Navigation, Autoplay]}
					loop={true}
					autoplay={{
						delay: 2000,
						disableOnInteraction: true,
					}}
					className="mySwiper"
				>
					<SwiperSlide>
						<div>
							<Link href={`/`}>
								<div className=" overflow-hidden ct-flex-center">
									<Image
										src="/image/collection-1.webp"
										alt=""
										width={184}
										height={184}
										onDragStart={(e) => e.preventDefault()}
									/>
								</div>
								<div className="text-center capitalize flex justify-center">
									<p className=" font-semibold text-sm">{ts("dates")}</p>
								</div>
							</Link>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div>
							<Link href={`/`}>
								<div className=" overflow-hidden ct-flex-center">
									<Image
										src="/image/collection-2.webp"
										alt=""
										width={184}
										height={184}
										onDragStart={(e) => e.preventDefault()}
									/>
								</div>
								<div className="text-center capitalize flex justify-center">
									<p className=" font-semibold text-sm">
										{ts("ramadan-corner")}
									</p>
								</div>
							</Link>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div>
							<Link href={`/`}>
								<div className=" overflow-hidden ct-flex-center">
									<Image
										src="/image/collection-3.webp"
										alt=""
										width={184}
										height={184}
										onDragStart={(e) => e.preventDefault()}
									/>
								</div>
								<div className="text-center capitalize flex justify-center">
									<p className=" font-semibold text-sm">{ts("honey-nut")}</p>
								</div>
							</Link>
						</div>
					</SwiperSlide>

					<SwiperSlide>
						<div>
							<Link href={`/`}>
								<div className=" overflow-hidden ct-flex-center">
									<Image
										src="/image/collection-4.webp"
										alt=""
										width={184}
										height={184}
										onDragStart={(e) => e.preventDefault()}
									/>
								</div>
								<div className="text-center capitalize flex justify-center">
									<p className=" font-semibold text-sm">{ts("ghee")}</p>
								</div>
							</Link>
						</div>
					</SwiperSlide>

					<SwiperSlide>
						<div>
							<Link href={`/`}>
								<div className=" overflow-hidden ct-flex-center">
									<Image
										src="/image/collection-5.webp"
										alt=""
										width={184}
										height={184}
										onDragStart={(e) => e.preventDefault()}
									/>
								</div>
								<div className="text-center capitalize flex justify-center">
									<p className=" font-semibold text-sm">{ts("organic-oil")}</p>
								</div>
							</Link>
						</div>
					</SwiperSlide>

					<SwiperSlide>
						<div>
							<Link href={`/`}>
								<div className=" overflow-hidden ct-flex-center">
									<Image
										src="/image/collection-1.webp"
										alt=""
										width={184}
										height={184}
										onDragStart={(e) => e.preventDefault()}
									/>
								</div>
								<div className="text-center capitalize flex justify-center">
									<p className=" font-semibold text-sm">{ts("dates")}</p>
								</div>
							</Link>
						</div>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
};

export default CollectionList;
