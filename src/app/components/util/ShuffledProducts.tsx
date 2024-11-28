"use client";
import React from "react";
import { useSelector } from "react-redux";
import {
	selectError,
	selectLoading,
	selectPage,
	selectProducts,
} from "../../redux/features/product/dataSlice";
import ProductCard from "../common/ProductCard";
import { fetchData } from "../../api/productsApiService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { findQuantityForProduct } from "../../lib/common/FindQuantity";
import { cartItemList } from "../../redux/features/checkout/shoppingcartSlice";
import { Product } from "../../types/productType";
import ShuffledProductsLoader from "./loader/ShuffledProductsLoader";
import RequestStock from "../product-details/RequestStock";
import PopUpToast from "../notification/PopUpToast";
import { shuffleProducts } from "@/app/lib/common/ShuffleProducts";

const ShuffledProducts = () => {
	const dispatch = useDispatch();
	const allProducts = useSelector(selectProducts);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const cartItems = useSelector(cartItemList);
	const [shuffleRelatedProducts, setShuffleRelatedProducts] = useState<
		Product[]
	>([]);
	const page = useSelector(selectPage);

	const [showOverlay, setShowOverlay] = useState<boolean>(false);
	const [showSuccessMesg, setShowSuccessMesg] = useState<boolean>(false);
	const [requestProductId, setRequestProductId] = useState<number | null>(null);
	// For shuffle products
	useEffect(() => {
		const onlyStockInProduct = allProducts.filter(
			(product: Product) => product.active_status === 1
		);
		const shuffledProducts = shuffleProducts(onlyStockInProduct).slice(0, 5);
		setShuffleRelatedProducts(shuffledProducts);
	}, [allProducts]);

	useEffect(() => {
		if (showOverlay) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [showOverlay]);

	// For Data Fetch
	useEffect(() => {
		dispatch(fetchData(page) as any);
	}, [dispatch, page]);

	if (error) {
		return <div className="ct-container">Error: {error}</div>;
	}

	if (!Array.isArray(shuffleRelatedProducts)) {
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
		<div className="relative">
			{loading ? (
				<ShuffledProductsLoader />
			) : (
				<div className="grid grid-cols-2 md:ct-grid-cols-3 lg:ct-grid-cols-4 xl:ct-grid-cols-5 gap-6 md:gap-4 my-6">
					{shuffleRelatedProducts.map((product: Product, index: number) => (
						<ProductCard
							key={product?.id}
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

export default ShuffledProducts;
