"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData } from "../../api/productsApiService";
import {
	selectFilter,
	selectFilteredProducts,
	selectStockOnly,
} from "../../redux/features/product/filterSlice";
import ProductCard from "../common/ProductCard";

import { Product } from "../../types/productType";
import { findQuantityForProduct } from "../../lib/common/FindQuantity";
import FilteredProductCardLoader from "./FilteredProductCardLoader";
import {
	selectError,
	selectLoading,
} from "../../redux/features/product/dataSlice";
import { cartItemList } from "../../redux/features/checkout/shoppingcartSlice";
import Overlay from "../product-details/Overlay";
import RequestStock from "../product-details/RequestStock";

const FilteredProductCard = () => {
	const dispatch = useDispatch();
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const cartItems = useSelector(cartItemList);
	const inStockOnly = useSelector(selectStockOnly);
	const { selectedCategories } = useSelector(selectFilter) || {
		selectedCategories: [],
	};

	const [showOverlay, setShowOverlay] = useState<boolean>(false);
	const [showSuccessMesg, setShowSuccessMesg] = useState<boolean>(false);
	const [requestProductId, setRequestProductId] = useState<number | null>(null);

	// For Data Fetch
	useEffect(() => {
		dispatch(fetchAllData() as any);
	}, [dispatch]);

	useEffect(() => {
		if (showOverlay) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [showOverlay]);

	const filteredByProducts = useSelector(selectFilteredProducts);

	const filteredProducts = filteredByProducts.filter(
		(product: Product) =>
			(inStockOnly ? product.active_status > 0 : true) &&
			(selectedCategories.length > 0
				? selectedCategories.includes(product?.mainCategory?.id)
				: true)
	);

	if (loading) {
		return (
			<div className="ct-container">
				<FilteredProductCardLoader />
			</div>
		);
	}

	if (error) {
		return <div className="ct-container">Error: {error}</div>;
	}

	if (!Array.isArray(filteredProducts)) {
		return <div className="ct-container">No products available</div>;
	}

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

	return (
		<div className=" relative">
			<div className="grid min-h-80 grid-cols-2 md:ct-grid-cols-3 lg:ct-grid-cols-4 gap-6 md:gap-4 my-2 lg:my-8">
				{filteredProducts.map((product: Product, index: number) => (
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
			<div
				className={`${
					showOverlay
						? "opacity-100 fixed inset-0 z-50"
						: "opacity-0 pointer-events-none"
				} smooth-animation-high`}
			>
				{/* Full-screen overlay */}
				<div className="absolute inset-0">
					<Overlay />
				</div>

				{/* Centered RequestStock component */}
				<div className="relative z-50 flex items-center justify-center h-full">
					<RequestStock
						closeOverlay={closeOverlay}
						toggleSuccessMesg={toggleSuccessMesg}
						requestProductId={requestProductId}
					/>
				</div>
			</div>
		</div>
	);
};

export default FilteredProductCard;
