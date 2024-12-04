"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import CustomButton from "../util/CustomButton";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
	addtoCart,
	decrementQuantity,
	incrementQuantity,
} from "../../redux/features/checkout/shoppingcartSlice";
import { toggleCart } from "../../redux/features/checkout/cartSlice";
import { Product } from "../../types/productType";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getBaseUrl } from "../../lib/helper/getBaseUrl";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { trackEvent } from "../../lib/dm/facebookPixel";

interface ProductCardProps {
	product: Product;
	index: number;
	findQuantityForProduct: (productId: number) => number;
	handleRequestStock: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
	product,
	index,
	findQuantityForProduct,
	handleRequestStock,
}) => {
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState<{ [productId: number]: number }>({});
	const params = useParams();

	const [imageUrl, setImageUrl] = useState(
		`${getBaseUrl(true)}/${product.product_image}`
	);

	const handleMouseEnter = () => {
		setImageUrl(`${getBaseUrl(true)}/${product.product_gallery[1]}`);
	};

	const handleMouseLeave = () => {
		setImageUrl(`${getBaseUrl(true)}/${product.product_image}`);
	};

	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);

	//   Add to cart button
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

	// Cart open function
	const handleToggleCart = () => {
		dispatch(toggleCart());
	};

	// Facebook Pixel Evens
	const handlePurchase = () => {
		// Perform your purchase logic here (e.g., API call, update state, etc.)

		// Track the purchase event
		trackEvent("Purchase", {
			value: 30.0, // Purchase amount
			currency: "USD",
		});
	};

	const selectedLanguage = useSelector(languageSelector);

	// For multi-language
	const t = useTranslations("addToCart");

	return (
		<div
			key={product.id}
			className="h-auto p-2 border border-borderLine rounded shadow"
		>
			<div>
				<Link href={`/products/${product?.product_slug}`}>
					<div ref={imageRef} className=" relative">
						<div className=" overflow-hidden min-h-[210px] relative">
							<Image
								src={imageUrl}
								alt={
									selectedLanguage === "bn"
										? product.product_title_bn
										: product.product_title_en
								}
								width={186}
								height={186}
								className={`mx-auto scale-101 ct-zoom-in-hover h-full object-cover w-full will-change-transform`}
								onDragStart={(e) => e.preventDefault()}
								layout="responsive"
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
							/>
						</div>

						{/* Discount tag */}
						{product.discount_amount > 0 && (
							<div className="absolute top-[2%] md:top-[3%] right-[3%] px-2 py-1 rounded-full drop-shadow-md bg-gbSecondaryActiveColor">
								<p className="text-[10px] sm:text-xs text-white md:font-bold capitalize">
									<span>-</span>
									{product.discount_amount}
									<span>{product.discount_type}</span>
								</p>
							</div>
						)}

						{/* Product status */}
						{product.product_status === "undefined" ||
						product.product_status === " " ||
						product.product_status === "" ||
						product.product_status === null ? (
							""
						) : (
							<div className="absolute top-[2%] md:top-[3%] left-[3%] px-2 py-1 bg-gbPrimaryColor rounded-full drop-shadow-md">
								<p className="text-[10px] sm:text-xs text-white md:font-bold capitalize">
									<span>{product.product_status}</span>
								</p>
							</div>
						)}
					</div>
				</Link>

				<div className="my-2">
					<Link href={`/products/${product?.product_slug}`}>
						<h2 className=" text-sm h-10 overflow-hidden line-clamp-2 capitalize font-semibold">
							{selectedLanguage === "bn"
								? product.product_title_bn
								: product.product_title_en}
						</h2>
						<p className="w-[70%] lg:w-[50%] mt-1 text-center text-xs text-gbPrimaryHoverColor font-bold px-4 py-1 rounded-2xl bg-gbPrimaryColorLight">
							<span>{product.pack_size}</span>
						</p>
					</Link>
					<div className="ct-flex-start items-center gap-x-2 py-2">
						<p
							className={`${
								product.discount_amount > 0
									? "text-xs text-[#C1C1C1] line-through"
									: "text-sm text-black font-bold"
							} `}
						>
							৳&nbsp;<span>{product?.regular_prices?.toFixed(2)}</span>
						</p>

						{product.discount_amount > 0 && (
							<p className=" text-sm font-bold">
								৳&nbsp;<span>{product?.current_prices?.toFixed(2)}</span>
							</p>
						)}
					</div>
					{product.active_status === 1 ? (
						<div>
							{findQuantityForProduct(product.id) > 0 ? (
								<div className="ct-flex-center overflow-hidden flex-col gap-2">
									<div className="w-full cursor-pointer">
										<div
											onClick={handlePurchase}
											className="bg-gbSecondaryActiveColor py-2 text-[10px] sm:text-sm w-full ct-flex-between px-1 md:px-2 rounded capitalize text-white"
										>
											<button
												className="p-[3px] md:p-1 rounded bg-gbBgSecondaryWhite shadow-2xl"
												onClick={() => dispatch(decrementQuantity(product.id))}
											>
												<FaMinus className=" text-[8px] sm:text-xs text-black" />
											</button>

											<button
												className=" px-1 md:px-0 text-[10px] sm:text-sm"
												onClick={handleToggleCart}
											>
												<span>{findQuantityForProduct(product.id)}</span>
												<span className=" capitalize">
													&nbsp;{t("quality-text")}
												</span>
											</button>

											<button
												className="p-[3px] md:p-1 rounded bg-gbBgSecondaryWhite shadow-2xl"
												onClick={() => dispatch(incrementQuantity(product.id))}
											>
												<FaPlus className="text-[8px] sm:text-xs text-black" />
											</button>
										</div>
									</div>
								</div>
							) : (
								<div>
									<div>
										<button
											className={`bg-gbPrimaryColor hover:bg-gbPrimaryHoverColor py-2 text-[10px] sm:text-sm w-full rounded capitalize text-white smooth-animation-mid`}
											onClick={() => {
												handleAddToCart(product, index);
											}}
										>
											<CustomButton buttonText={t("add-to-cart-button")} />
										</button>
									</div>
								</div>
							)}
						</div>
					) : (
						<div>
							<button
								// onClick={handleRequestStock}
								onClick={() => {
									handleRequestStock(product.id);
								}}
								className={`bg-gbInactiveColor py-2 text-[10px] sm:text-sm w-full rounded capitalize text-white`}
							>
								<CustomButton buttonText={t("stock-out")} />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
