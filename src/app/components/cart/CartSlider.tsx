"use client";
import CustomButton from "../util/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { closeCart } from "../../redux/features/checkout/cartSlice";
import EmptyCart from "./EmptyCart";
import {
	cartItemList,
	selectSubtotal,
	selectTotalQuantity,
} from "../../redux/features/checkout/shoppingcartSlice";
import CartItem from "./CartItem";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { cartItem } from "../../types/cartItemType";

const CartSlider: React.FC = () => {
	const dispatch = useDispatch();

	const cartItems = useSelector(cartItemList);
	const subtotal = useSelector(selectSubtotal);
	const totalQuantity = useSelector(selectTotalQuantity);
	const selectedLanguage = useSelector(languageSelector);

	const handleCloseCart = () => {
		dispatch(closeCart());
	};

	function adjustCartSliderHeight() {
		const cartSlider = document.querySelector(".cart-slider") as HTMLElement; // Assert the type
		if (cartSlider) {
			// Set height to the inner height of the window
			const sliderHeight = window.innerHeight; // Get current inner height
			cartSlider.style.height = `${sliderHeight}px`; // Set the height directly
			// Optionally, update the CSS variable if you want to use it elsewhere
			document.documentElement.style.setProperty(
				"--slider-height",
				`${sliderHeight}px`
			);
		}
	}

	// Call the function on load and resize
	window.addEventListener("load", adjustCartSliderHeight);
	window.addEventListener("resize", adjustCartSliderHeight);

	// For multi-language
	const t = useTranslations("cartSlider");
	return (
		<div className="relative w-full">
			<div className=" relative w-full">
				<div className="cart-slider w-full absolute z-50 top-0 right-0 md:w-[450px] border border-solid border-gray bg-componentBg shadow-md flex flex-col justify-between">
					<div className="px-4 py-8 ct-flex-between relative border-b border-b-borderLine">
						<h3 className=" text-xl font-semibold capitalize">
							{t("shoping-bag")}
							<span className="ml-2">({totalQuantity})</span>
						</h3>

						<button className="cursor-pointer" onClick={handleCloseCart}>
							<RxCross2 className="text-2xl" />
						</button>
					</div>

					<div className="p-4 overflow-auto bg-white lg:scrollbar-thin lg:scrollbar-thumb-gbCustomScrollThumbColor lg:scrollbar-track-[#FEF3E9] lg:scrollbar-thumb-rounded flex-grow ">
						<ul className="w-full flex flex-col space-y-2 relative z-20">
							{cartItems.map((item: cartItem) => {
								return <CartItem key={item.id} item={item} />;
							})}
						</ul>
						<div
							className={`smooth-animation-mid ${
								cartItems.length < 1 ? "opacity-100" : "hidden"
							}`}
						>
							<EmptyCart />
						</div>
					</div>

					<div className="px-4 py-4 flex-shrink-0 border-t-2 border-solid border-gray flex flex-col gap-4">
						<div className="ct-flex-between text-xl font-semibold">
							<p className="capitalize">{t("sub-total")}</p>
							<p>
								৳&nbsp;<span>{subtotal.toFixed(2)}</span>
							</p>
						</div>
						{totalQuantity > 0 ? (
							<Link
								href={`/checkout`}
								className="ct-flex-center bg-gbPrimaryColor py-3 w-full rounded capitalize text-white"
								onClick={handleCloseCart}
							>
								<CustomButton buttonText={t("button")} />
							</Link>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartSlider;
