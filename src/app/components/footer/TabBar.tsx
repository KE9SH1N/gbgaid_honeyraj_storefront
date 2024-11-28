"use client";
import Link from "next/link";
import {
	cartOpen,
	closeCart,
	toggleCart,
} from "../../redux/features/checkout/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import { cartItemList } from "../../redux/features/checkout/shoppingcartSlice";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { selectUserDetailsData } from "../../redux/features/auth/userDetailsSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const TabBar: React.FC = () => {
	const router = useRouter();
	const cartItem = useSelector(cartItemList);
	const dispatch = useDispatch();

	const isCartOpen = useSelector(cartOpen);
	useEffect(() => {
		if (isCartOpen) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [isCartOpen]);

	const handleToggleCart = () => {
		dispatch(toggleCart());
	};

	const selectedLanguage = useSelector(languageSelector);

	const handleCloseCart = () => {
		dispatch(closeCart());
	};

	// For multi-language
	const t = useTranslations("tabBarMenu");

	const token = localStorage.getItem("accessToken");
	const userData = useSelector(selectUserDetailsData);

	return (
		<div>
			<div className="bg-white py-3 shadow-inner z-10 fixed bottom-0 left-0 right-0 lg:hidden">
				<div className="ct-container">
					<ul className="ct-grid-cols-3">
						<Link href={`/`} onClick={handleCloseCart}>
							<li className="ct-flex-center flex-col">
								<FaHome className="text-xl" />
								<p className="text-xs capitalize">{t("home")}</p>
							</li>
						</Link>
						{/* <Link href={`/category`} onClick={handleCloseCart}>
							<li className="ct-flex-center flex-col">
								<BiCategory className="text-xl" />
								<p className="text-xs capitalize">{t("category")}</p>
							</li>
						</Link> */}
						<li className="ct-flex-center relative flex-col">
							<button onClick={handleToggleCart}>
								<FiShoppingCart className="text-xl" />
								<p className="text-xs capitalize">{t("cart")}</p>
								{cartItem.length > 0 && (
									<span className=" absolute right-[20%] md:right-[35%] -top-[20%] text-[8px] font-semibold text-white py-1 px-2 rounded-full bg-cartCountBg">
										{cartItem.length}
									</span>
								)}
							</button>
						</li>
						<Link href="" onClick={handleCloseCart}>
							{token ? (
								<Link href={`/auth/profile`}>
									<li className="ct-flex-center flex-col">
										<MdOutlineLogin className="text-xl" />
										<p className="text-xs capitalize">{t("profile")}</p>
									</li>
								</Link>
							) : (
								<Link href={`/auth/login`}>
									<li className="ct-flex-center flex-col">
										<MdOutlineLogout className="text-xl" />
										<p className="text-xs capitalize">{t("login")}</p>
									</li>
								</Link>
							)}
						</Link>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default TabBar;
