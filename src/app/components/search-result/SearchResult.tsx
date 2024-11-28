"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../common/ProductCard";
import { findQuantityForProduct } from "../../lib/common/FindQuantity";
import { useSelector } from "react-redux";
import { Product } from "../../types/productType";
import EmptySearchResult from "./EmptySearchResult";
import { useTranslations } from "next-intl";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { cartItemList } from "../../redux/features/checkout/shoppingcartSlice";
import SearchPreloader from "../util/loader/SearchPreloader";
import { MagnifyingGlass } from "react-loader-spinner";
import RequestStock from "../product-details/RequestStock";

const SearchResult = ({ searchItem, searchParam }: any) => {
	const [loading, setLoading] = useState(true);
	const cartItems = useSelector(cartItemList);

	const selectedLanguage = useSelector(languageSelector);
	const [showOverlay, setShowOverlay] = useState<boolean>(false);
	const [showSuccessMesg, setShowSuccessMesg] = useState<boolean>(false);
	const [requestProductId, setRequestProductId] = useState<number | null>(null);

	useEffect(() => {
		setLoading(true);
		const loadingTimer = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => clearTimeout(loadingTimer);
	}, [searchItem, searchParam]);

	useEffect(() => {
		if (showOverlay) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [showOverlay]);

	const searchProductData = searchItem?.data;

	const toggleSuccessMesg = () => {
		setShowSuccessMesg(true);
	};

	const handleRequestStock = (id: number) => {
		setRequestProductId(id);
		setShowOverlay(!showOverlay);
	};
	const closeOverlay = () => {
		setShowOverlay(false);
	};

	// For multi-language
	const t = useTranslations("searchResult");

	return (
		<div className="ct-container mb-20 lg:mb-0 min-h-[800px]">
			<div className="">
				<div className=" ct-flex-center">
					{selectedLanguage === "en" ? (
						<div className="font-bold ct-flex-center flex-row gap-x-5">
							{loading ? (
								<MagnifyingGlass
									visible={true}
									height="40"
									width="40"
									ariaLabel="magnifying-glass-loading"
									wrapperStyle={{}}
									wrapperClass="magnifying-glass-wrapper"
									glassColor="#e2f8ff"
									color="#f68821"
								/>
							) : (
								<span className=" text-sm font-normal">
									{t("search-results-for")}
								</span>
							)}

							<p className="text-lg capitalize">{searchParam}</p>
						</div>
					) : (
						<div className="font-bold ct-flex-center flex-row gap-x-5">
							<p className="text-lg capitalize">{searchParam}</p>
							{loading ? (
								<MagnifyingGlass
									visible={true}
									height="40"
									width="40"
									ariaLabel="magnifying-glass-loading"
									wrapperStyle={{}}
									wrapperClass="magnifying-glass-wrapper"
									glassColor="#e2f8ff"
									color="#f68821"
								/>
							) : (
								<span className=" text-sm font-normal">
									{t("search-results-for")}
								</span>
							)}
						</div>
					)}
				</div>
			</div>

			<div className="w-full relative">
				{loading && <SearchPreloader />}
				<div>
					{searchProductData?.length > 0 ? (
						<div
							className={`${
								!loading ? "opacity-100" : "opacity-0"
							} transition-opacity duration-1000 ease-in-out`}
						>
							{!loading && (
								<div
									className={
										"grid grid-cols-2 md:ct-grid-cols-3 lg:ct-grid-cols-4 xl:ct-grid-cols-5 gap-6 md:gap-4 my-6"
									}
								>
									{searchProductData &&
										searchProductData.map((product: Product, index: number) => (
											<ProductCard
												key={product.id}
												product={product}
												index={index}
												findQuantityForProduct={(productId: number) =>
													findQuantityForProduct(cartItems, productId)
												}
												handleRequestStock={handleRequestStock}
											/>
										))}
								</div>
							)}
						</div>
					) : (
						<div
							className={`${
								!loading ? "opacity-100" : "opacity-0"
							} transition-opacity duration-1000 ease-in-out`}
						>
							{!loading && (
								<div>
									<EmptySearchResult />
								</div>
							)}
						</div>
					)}
				</div>
				<div
					className={`${
						showOverlay
							? "opacity-100 fixed inset-0 z-50 bg-black bg-opacity-50"
							: "opacity-0 pointer-events-none bg-none bg-opacity-0"
					} smooth-animation-high`}
				>
					<div className="relative z-50 flex items-center justify-center h-full">
						<RequestStock
							closeOverlay={closeOverlay}
							toggleSuccessMesg={toggleSuccessMesg}
							requestProductId={requestProductId}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchResult;
