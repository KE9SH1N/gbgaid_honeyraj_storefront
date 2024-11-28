"use client";
import React, { useEffect } from "react";
import CustomButton from "../util/CustomButton";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addtoCart,
	cartItemList,
	decrementQuantity,
	incrementQuantity,
} from "../../redux/features/checkout/shoppingcartSlice";
import { toggleCart } from "../../redux/features/checkout/cartSlice";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Product } from "../../types/productType";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { selectProductDetailsData } from "../../redux/features/product/productdetailsSlice";
import { cartItem } from "../../types/cartItemType";
import RequestStock from "./RequestStock";

const ProductDetailsInfo = () => {
	const dispatch = useDispatch();

	const productDetailsData = useSelector(selectProductDetailsData);
	const selectedLanguage = useSelector(languageSelector);

	const [quantity, setQuantity] = useState<{ [productId: number]: number }>({});
	const [requestProductId, setRequestProductId] = useState<number | null>(null);
	const cartItems = useSelector(cartItemList);

	const [showOverlay, setShowOverlay] = useState<boolean>(false);
	const [showSuccessMesg, setShowSuccessMesg] = useState<boolean>(false);

	const discountAmount =
		productDetailsData?.regular_prices - productDetailsData?.current_prices;

	const handleAddToCart = (product: Product, index: number) => {
		let productQuantity = quantity[product.id] || 1;
		if (productQuantity >= 0) {
			dispatch(addtoCart({ ...product, quantity: productQuantity }));
			setQuantity((prevQuantity) => ({
				...prevQuantity,
				[product.id]: 1,
			}));
		}
	};

	//   Cart open function
	const handleToggleCart = () => {
		dispatch(toggleCart());
	};

	// For conditional add to cart button render
	const findQuantityForProduct = (productId: number) => {
		const foundItem = cartItems.find((item: cartItem) => item.id === productId);
		return foundItem ? foundItem.quantity : 0;
	};

	const handleRequestStock = (id: number) => {
		setRequestProductId(id);
		setShowOverlay(!showOverlay);
	};

	useEffect(() => {
		if (showOverlay) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [showOverlay]);

	const closeOverlay = () => {
		setShowOverlay(false);
	};

	const toggleSuccessMesg = () => {
		setShowSuccessMesg(true);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowSuccessMesg(false);
		}, 10000);

		return () => clearTimeout(timer);
	}, [showSuccessMesg]);

	// For multi-language
	const t = useTranslations("addToCart");
	return (
		<div className="w-full md:my-0 my-8 relative">
			<div>
				{selectedLanguage === "bn" ? (
					<h1 className=" font-semibold md:text-xl lg:mb-4 h-10 md:h-14 lg:h-8 overflow-hidden line-clamp-2">
						{productDetailsData?.product_title_bn}
					</h1>
				) : (
					<h1 className=" font-semibold text-sm md:text-xl lg:mb-4 h-10 md:h-14 lg:h-8 overflow-hidden line-clamp-2">
						{productDetailsData?.product_title_en}
					</h1>
				)}
			</div>
			<div className="mt-0 md:mt-2 ">
				<div className=" ct-flex-start lg:items-center md:flex-row flex-col gap-x-2 gap-y-2 lg:gap-y-0 ">
					<div className="ct-flex-start items-center space-x-1">
						<p
							className={`"py-2 font-semibold text-xl ${
								productDetailsData?.discount_amount == 0
									? "text-black"
									: "line-through text-[#CCCCCC]"
							} "`}
						>
							৳<span>{productDetailsData?.regular_prices?.toFixed(2)}</span>
						</p>
						<div>
							{productDetailsData?.discount_amount !== 0 && (
								<p className="py-2 font-semibold text-xl">
									৳<span>{productDetailsData?.current_prices?.toFixed(2)}</span>
								</p>
							)}
						</div>
						{productDetailsData?.discount_amount > 0 && (
							<div className="flex">
								<p className=" capitalize font-semibold text-sm lg:text-lg text-gbActiveColor rounded-sm px-2">
									{selectedLanguage == "bn" ? (
										<span>সেভ {discountAmount.toFixed(2)} টাকা</span>
									) : (
										<span>save {discountAmount} taka</span>
									)}
								</p>
							</div>
						)}
					</div>
					<div className="ct-flex-start flex-row gap-4">
						<div>
							<p className="py-2 px-3 font-medium text-xs text-gbPrimaryColor bg-[#FEF3E9] rounded-full">
								{productDetailsData?.pack_size}
							</p>
						</div>

						<div
							className={`py-2 px-3 font-medium text-xs text-white ${
								productDetailsData?.active_status == 1
									? "bg-gbActiveColor"
									: "bg-gbInactiveColor"
							} capitalize rounded-full`}
						>
							{productDetailsData?.active_status == 1
								? "stock in"
								: "stock out"}
						</div>
					</div>
				</div>
			</div>
			{productDetailsData?.active_status === 1 ? (
				<div className="hidden md:flex w-full my-4 ct-flex-center gap-x-4">
					<div className="w-full">
						{findQuantityForProduct(productDetailsData?.id) > 0 ? (
							<div className="ct-flex-center overflow-hidden flex-col gap-2">
								<div className="w-full cursor-pointer">
									<div className="bg-gbSecondaryActiveColor py-4 text-sm w-full ct-flex-between px-1 md:px-2 rounded capitalize text-white">
										<button
											className="p-1 rounded bg-gbBgSecondaryWhite shadow-2xl"
											onClick={() =>
												dispatch(decrementQuantity(productDetailsData.id))
											}
										>
											<FaMinus className=" text-xs text-black" />
										</button>

										<button
											className="text-xs px-1 md:px-0 md:text-sm"
											onClick={handleToggleCart}
										>
											<span>
												{findQuantityForProduct(productDetailsData.id)}
											</span>
											<span className=" capitalize">
												&nbsp;&nbsp;{t("quality-text")}
											</span>
										</button>

										<button
											className="p-1 rounded bg-gbBgSecondaryWhite shadow-2xl"
											onClick={() =>
												dispatch(incrementQuantity(productDetailsData.id))
											}
										>
											<FaPlus className=" text-xs text-black" />
										</button>
									</div>
								</div>
							</div>
						) : (
							<div>
								<div>
									<button
										className={` inner-border-2 inner-border-gbPrimaryColor py-4 text-sm w-full rounded capitalize relative text-gbPrimaryColor`}
										onClick={() => {
											handleAddToCart(
												productDetailsData,
												productDetailsData.id
											);
										}}
									>
										<div className=" ct-flex-center gap-x-3">
											<FaShoppingCart className=" text-xl" />
											<CustomButton buttonText={t("add-to-cart-button")} />
										</div>
									</button>
								</div>
							</div>
						)}
					</div>
					<div
						className={`bg-gbPrimaryColor py-4 text-sm w-full text-center rounded capitalize text-white cursor-pointer`}
					>
						<Link href={`/checkout`}>
							<div
								onClick={() => {
									handleAddToCart(productDetailsData, productDetailsData.id);
								}}
							>
								<CustomButton buttonText={t("buy-now-button")} />
							</div>
						</Link>
					</div>
				</div>
			) : (
				<div className=" w-full my-6 hidden md:flex">
					<button
						className={` bg-gbPrimaryColor py-4 text-sm w-[50%] rounded capitalize relative text-white`}
						onClick={() => {
							handleRequestStock(productDetailsData.id);
						}}
					>
						<div className=" ct-flex-center gap-x-3">
							<CustomButton buttonText={t("request-stock-btn")} />
						</div>
					</button>
				</div>
			)}

			{/* Small display add to cart button  */}
			{productDetailsData?.active_status === 1 ? (
				<div className="w-full z-10 fixed bottom-[6.9%] left-0 right-0 md:hidden">
					<div>
						{findQuantityForProduct(productDetailsData?.id) > 0 ? (
							<div className="ct-flex-center overflow-hidden flex-col gap-2">
								<div className="w-full cursor-pointer">
									<div className="bg-gbSecondaryActiveColor py-4 text-sm w-full ct-flex-between px-1 md:px-2 capitalize text-white">
										<button
											className="p-1 rounded bg-gbBgSecondaryWhite shadow-2xl"
											onClick={() =>
												dispatch(decrementQuantity(productDetailsData.id))
											}
										>
											<FaMinus className=" text-xs text-black" />
										</button>

										<button
											className="text-xs px-1 md:px-0 md:text-sm"
											onClick={handleToggleCart}
										>
											<span>
												{findQuantityForProduct(productDetailsData.id)}
											</span>
											<span className=" capitalize">
												&nbsp;&nbsp;{t("quality-text")}
											</span>
										</button>

										<button
											className="p-1 rounded bg-gbBgSecondaryWhite shadow-2xl"
											onClick={() =>
												dispatch(incrementQuantity(productDetailsData.id))
											}
										>
											<FaPlus className=" text-xs text-black" />
										</button>
									</div>
								</div>
							</div>
						) : (
							<div>
								<button
									className={`bg-gbPrimaryColor py-4 text-sm w-full capitalize relative text-white`}
									onClick={() => {
										handleAddToCart(productDetailsData, productDetailsData.id);
									}}
								>
									<div className=" ct-flex-center gap-x-3">
										<FaShoppingCart className=" text-xl" />
										<CustomButton buttonText={t("add-to-cart-button")} />
									</div>
								</button>
							</div>
						)}
					</div>
				</div>
			) : (
				<div className="w-full z-10 fixed bottom-[6.2%] left-0 right-0 md:hidden">
					<div>
						<button
							className={`w-full bg-gbPrimaryColor py-4 text-sm capitalize relative text-white`}
							onClick={() => {
								handleRequestStock(productDetailsData.id);
							}}
						>
							<div className=" ct-flex-center gap-x-3">
								<CustomButton buttonText={t("request-stock-btn")} />
							</div>
						</button>
					</div>
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

export default ProductDetailsInfo;
