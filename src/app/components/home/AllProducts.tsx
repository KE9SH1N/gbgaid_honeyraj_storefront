"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	selectError,
	selectLoading,
	selectPage,
	selectProducts,
	selectTotalPages,
} from "../../redux/features/product/dataSlice";
import ProductCard from "../common/ProductCard";
import { fetchData } from "../../api/productsApiService";
import { findQuantityForProduct } from "../../lib/common/FindQuantity";
import SectionHead from "../util/SectionHead";
import { useTranslations } from "next-intl";
import ProductCardLoader from "../common/ProductCardLoader";
import { cartItemList } from "../../redux/features/checkout/shoppingcartSlice";
import { Product } from "../../types/productType";
import RequestStock from "../product-details/RequestStock";

const AllProducts = () => {
	const dispatch = useDispatch();
	const [scrollPosition, setScrollPosition] = useState(0);

	const [showOverlay, setShowOverlay] = useState<boolean>(false);
	const [showSuccessMesg, setShowSuccessMesg] = useState<boolean>(false);
	const [requestProductId, setRequestProductId] = useState<number | null>(null);

	// Data Selector from RTK
	const products = useSelector(selectProducts);
	const loading = useSelector(selectLoading);
	const error = useSelector(selectError);
	const cartItems = useSelector(cartItemList);
	const page = useSelector(selectPage);
	const totalPages = useSelector(selectTotalPages);

	// For multi-language
	const t = useTranslations("sectionHead");
	const ts = useTranslations("randomButtons");

	// Ref to store debounced handleScroll function
	const debounceScrollRef = useRef<any>(null);

	// Determine loadThreshold based on screen size
	const getLoadThreshold = () => {
		if (window.innerWidth >= 1024) {
			return 900;
		} else {
			return 1300;
		}
	};

	// State for loadThreshold
	const [loadThreshold, setLoadThreshold] = useState(getLoadThreshold());

	// Debounced handleScroll function
	const handleScroll = useCallback(() => {
		const scrollPosition = window.innerHeight + window.scrollY;
		const pageEnd = document.documentElement.scrollHeight;
		// const loadThreshold = 1000;

		if (
			scrollPosition >= pageEnd - loadThreshold &&
			!loading &&
			page < totalPages
		) {
			dispatch(fetchData(page + 1) as any);
		}
	}, [dispatch, page, loading, totalPages, loadThreshold]);

	// Initialize debounce function when component mounts
	useEffect(() => {
		debounceScrollRef.current = debounce(handleScroll, 200);
	}, [handleScroll]);

	// Add scroll event listener with debounced function
	useEffect(() => {
		const handleScrollEvent = () => {
			debounceScrollRef.current();
		};

		window.addEventListener("scroll", handleScrollEvent);

		return () => {
			window.removeEventListener("scroll", handleScrollEvent);
		};
	}, []);

	// Fetch initial data
	useEffect(() => {
		dispatch(fetchData(1) as any);
	}, [dispatch]);

	// Restore scroll position on component unmount
	useEffect(() => {
		window.scrollTo(0, scrollPosition);
	}, [scrollPosition]);

	// Scroll to top on component mount
	useEffect(() => {
		window.scrollTo(0, 0);
		if ("scrollRestoration" in history) {
			history.scrollRestoration = "manual";
		}
	}, []);

	useEffect(() => {
		if (showOverlay) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [showOverlay]);

	// Utility function to debounce a callback
	function debounce(func: Function, wait: number) {
		let timeout: ReturnType<typeof setTimeout> | null;
		return function executedFunction(...args: any[]) {
			const later = () => {
				timeout = null;
				func(...args);
			};
			clearTimeout(timeout as ReturnType<typeof setTimeout>);
			timeout = setTimeout(later, wait);
		};
	}

	if (loading && page === 1) {
		return (
			<div className="ct-container">
				<ProductCardLoader />
			</div>
		);
	}

	if (error) {
		return <div className="ct-container">Error: {error}</div>;
	}

	if (!Array.isArray(products) || products.length === 0) {
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
		<div className="ct-container relative">
			<div>
				<SectionHead headingText={t("all-products")} />
			</div>
			<div className="grid grid-cols-2 md:ct-grid-cols-3 lg:ct-grid-cols-4 xl:ct-grid-cols-5 gap-6 md:gap-4 my-6">
				{products.map((product: Product, index: number) => (
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

export default AllProducts;
