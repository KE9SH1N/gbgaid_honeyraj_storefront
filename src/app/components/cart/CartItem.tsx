import React from "react";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import {
	decrementQuantity,
	incrementQuantity,
	removefromCart,
	updateQuantity,
} from "../../redux/features/checkout/shoppingcartSlice";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { getBaseUrl } from "../../lib/helper/getBaseUrl";
import { cartItem } from "../../types/cartItemType";

interface CartItemProps {
	item: cartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
	const dispatch = useDispatch();

	const handleQuantityChange = (productId: number, newQuantity: number) => {
		dispatch(updateQuantity({ id: productId, quantity: newQuantity }));
	};

	const selectedLanguage = useSelector(languageSelector);

	return (
		<div>
			<li
				key={item.id}
				className="w-full ct-flex-between items-start bg-componentBg rounded"
			>
				<div className="ct-flex-start items-start p-2 overflow-x-hidden w-full">
					<div className="w-[60%]">
						<Image
							src={`${getBaseUrl(true)}//${item.product_image}`}
							alt={
								selectedLanguage === "bn"
									? item.product_title_bn
									: item.product_title_en
							}
							width={120}
							height={120}
						/>
					</div>
					<div className="ct-flex-between flex-col gap-y-4 w-[60%] md:w-full">
						<div className="w-full font-medium">
							<div className="ct-flex-between items-start">
								<h3 className="w-full h-12 text-sm md:text-base line-clamp-2 overflow-hidden capitalize">
									{selectedLanguage === "bn"
										? item.product_title_bn
										: item.product_title_en}
								</h3>
								<button
									className="cursor-pointer"
									onClick={() => dispatch(removefromCart(item.id))}
								>
									<RiDeleteBin5Fill className="text-gbInactiveColorLight w-8 h-8 p-2 rounded-full bg-gbPrimaryColorLight" />
								</button>
							</div>

							<p className="w-[40%] text-center text-xs lowercase text-gbPrimaryHoverColor py-1 mt-2 rounded-2xl bg-gbPrimaryColorLight">
								<span>{item.pack_size}</span>
							</p>
						</div>

						<div className="ct-flex-between gap-x-6 w-full">
							<div className="font-semibold">
								{item.discount_amount > 0 && (
									<p>
										৳&nbsp;
										<span>{item?.current_prices?.toFixed(2)}</span>
									</p>
								)}

								{item.discount_amount == 0 && (
									<p>
										৳&nbsp;<span>{item?.regular_prices?.toFixed(2)}</span>
									</p>
								)}
							</div>
							<div className="border border-borderLine rounded p-1 ct-flex-center w-32 md:w-24 xl:w-20 gap-x-2 xl:gap-x-2">
								<button
									className="rounded cursor-pointer"
									onClick={() => dispatch(decrementQuantity(item.id))}
								>
									<FaMinus className=" text-xs" />
								</button>
								<input
									type="text"
									value={item.quantity}
									className="text-xs text-center w-full"
									onChange={(e) => {
										const inputValue = e.target.value.trim();
										if (/^[1-9]\d*$/.test(inputValue)) {
											handleQuantityChange(item.id, parseInt(inputValue));
										} else if (inputValue === "") {
											handleQuantityChange(item.id, 1);
										}
									}}
								/>
								<button
									className="rounded cursor-pointer"
									onClick={() => dispatch(incrementQuantity(item.id))}
								>
									<FaPlus className=" font-thin text-xs" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</li>
		</div>
	);
};

export default CartItem;
