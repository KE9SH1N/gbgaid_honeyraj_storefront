"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import SectionHead from "../util/SectionHead";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import ProductCard from "../common/ProductCard";

import { Product } from "../../types/productType";
import { cartItem } from "../../types/cartItemType";
import {
	selectError,
	selectLoading,
	selectProducts,
} from "../../redux/features/product/dataSlice";
import { cartItemList } from "../../redux/features/checkout/shoppingcartSlice";
import { selectBestSellingProducts } from "@/app/redux/features/product/bestSellingProductsSlice";
import { fetchBestSellingProducts } from "@/app/api/bestSellingApiService";

const BestSelling = () => {
	const dispatch = useDispatch();
	const [slidesPerView, setSlidesPerView] = useState<number>(1);
	// For multi-language
	const t = useTranslations("sectionHead");
	const ts = useTranslations("collectionList");
	const selectedLanguage = useSelector(languageSelector);

	const [requestProductId, setRequestProductId] = useState<number | null>(null);
	const [showOverlay, setShowOverlay] = useState<boolean>(false);

	const allProducts = useSelector(selectProducts);
	const loading = useSelector(selectLoading);
	const errors = useSelector(selectError);
	const cartItems = useSelector(cartItemList);
	const bestSellingProducts = useSelector(selectBestSellingProducts);

	console.log(bestSellingProducts);

	// Fetch initial data
	useEffect(() => {
		dispatch(fetchBestSellingProducts() as any);
	}, [dispatch]);

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

	if (loading) {
		return <div className="ct-container">Loading...</div>;
	}

	if (errors) {
		return <div className="ct-container">Error: {errors}</div>;
	}

	if (!Array.isArray(allProducts)) {
		return <div className="ct-container">No products available</div>;
	}

	// For conditional add to cart button render
	const findQuantityForProduct = (productId: number) => {
		const foundItem = cartItems.find((item: cartItem) => item.id === productId);
		return foundItem ? foundItem.quantity : 0;
	};

	const handleRequestStock = (id: number) => {
		setRequestProductId(id);
		setShowOverlay(!showOverlay);
	};

	return (
		<div className="ct-container">
			<div>
				<SectionHead headingText={t("best-selling")} />
			</div>
			<div className="my-8">
				<Swiper
					slidesPerView={slidesPerView}
					spaceBetween={10}
					navigation={true}
					modules={[Navigation, Autoplay]}
					loop={true}
					autoplay={{
						delay: 4000,
						disableOnInteraction: true,
						pauseOnMouseEnter: true,
					}}
					className="mySwiper"
				>
					{bestSellingProducts?.map((product: Product, index: number) => (
						<SwiperSlide key={product.id}>
							<ProductCard
								product={product}
								index={index}
								findQuantityForProduct={findQuantityForProduct}
								handleRequestStock={handleRequestStock}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default BestSelling;
