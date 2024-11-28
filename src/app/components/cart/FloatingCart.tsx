"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalQuantity } from "../../redux/features/checkout/shoppingcartSlice";
import { toggleCart } from "../../redux/features/checkout/cartSlice";
import { TiShoppingCart } from "react-icons/ti";
import { useTranslations } from "next-intl";

const FloatingCart: React.FC = () => {
	const dispatch = useDispatch();
	const totalQuantity = useSelector(selectTotalQuantity);

	const handleToggleCart = () => {
		dispatch(toggleCart());
	};
	// For multi-language
	const t = useTranslations("cart");

	return (
		<div onClick={handleToggleCart}>
			{totalQuantity > 0 ? (
				<div className=" p-0">
					<div className="">
						<button className=" fixed z-50 top-[70%] right-[14%]  lg:right-[2%] xl:w-[8%] lg:w-[10%] hidden lg:flex py-4 ct-flex-center flex-row gap-x-1 capitalize text-white text-xs bg-gbSecondaryActiveColor hover:bg-gbPrimaryHoverColor rounded-full smooth-animation-mid">
							<div className="w-5 h-5 top-[3%] right-[2%] absolute rounded-full bg-white">
								<div className="w-3 h-3 top-[20%] left-[20%] absolute rounded-full bg-red-700"></div>
							</div>
							<TiShoppingCart className="text-2xl" />
							<p>{t("floating-cart")}</p>
							<span>({totalQuantity})</span>
						</button>
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default FloatingCart;
