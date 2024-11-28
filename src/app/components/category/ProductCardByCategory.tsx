"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../common/ProductCard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { findQuantityForProduct } from "../../lib/common/FindQuantity";
import SectionHead from "../util/SectionHead";
import {
	selectError,
	selectLoading,
	selectPage,
} from "../../redux/features/product/dataSlice";
import { useParams } from "next/navigation";
import { selectCategories } from "../../redux/features/product/categorydataSlice";
import { Product } from "../../types/productType";
import { fetchAllData } from "../../api/productsApiService";
import EmptyCategoryResult from "./EmptyCategoryResult";
import { selectAllProducts } from "../../redux/features/product/allDataSlice";
import { cartItemList } from "../../redux/features/checkout/shoppingcartSlice";
import { category } from "../../types/categoryType";
import RequestStock from "../product-details/RequestStock";
import PopUpToast from "../notification/PopUpToast";

const ProductCardByCategory = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const categoryParamId = params.id[0];
	const allProducts = useSelector(selectAllProducts);
	const categories = useSelector(selectCategories);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const cartItems = useSelector(cartItemList);
	const page = useSelector(selectPage);

	const [showOverlay, setShowOverlay] = useState<boolean>(false);
	const [showSuccessMesg, setShowSuccessMesg] = useState<boolean>(false);
	const [requestProductId, setRequestProductId] = useState<number | null>(null);

	const categoryByProduct = allProducts.filter(
		(product: Product) => product.mainCategory?.slug === categoryParamId
	);

	useEffect(() => {
		if (showOverlay) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [showOverlay]);

	// For Data Fetch
	useEffect(() => {
		dispatch(fetchAllData() as any);
	}, [dispatch, page]);

	if (loading) {
		return <div className="ct-container">Loading... </div>;
	}

	if (error) {
		return <div className="ct-container">Error: {error}</div>;
	}

	if (!Array.isArray(categoryByProduct)) {
		return <div className="ct-container">No products</div>;
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
			<div className="ct-container">
				{categories
					.filter(
						(categoryItem: category) => categoryItem?.slug === categoryParamId
					)
					.map((categoryItem: category) => (
						<SectionHead
							key={categoryItem.id}
							headingText={categoryItem.name_bn}
						/>
					))}
			</div>
			<div>
				{categoryByProduct.length > 0 ? (
					<div className="ct-container grid grid-cols-2 md:ct-grid-cols-3 lg:ct-grid-cols-4 xl:ct-grid-cols-5 gap-6 md:gap-4 my-6">
						{categoryByProduct.map((product: Product, index: number) => (
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
				) : (
					<div>
						<EmptyCategoryResult />
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
	);
};

export default ProductCardByCategory;
