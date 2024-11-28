"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBox from "./SearchBox";
import LanguageDropdown from "../util/LanguageDropdown";
import MobileSidebar from "./MobileSidebar";
import CartSlider from "../cart/CartSlider";

import { useDispatch, useSelector } from "react-redux";
import {
	cartOpen,
	closeCart,
	floatingCartOpen,
	toggleCart,
} from "../../redux/features/checkout/cartSlice";
import {
	closeSidebar,
	sidebarOpen,
	toggleSidebar,
} from "../../redux/features/util/sidebarSlice";
import FloatingCart from "../cart/FloatingCart";
import { selectTotalQuantity } from "../../redux/features/checkout/shoppingcartSlice";
import { SlMenu } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FiShoppingCart } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import { disableCopy } from "../../lib/common/DisableCopyCommand";
import { useTranslations } from "next-intl";
import { useSearch } from "../../hooks/useSearch";
import useEnterKey from "../../hooks/useEnterKey";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import UserAccountDropdown from "./UserAccountDropdown";
import { getUserInfo } from "../../lib/common/AuthTokenDecoder";
import { fetchUserDetailsById } from "../../api/userDetailsApiService";
import {
	getProductFailure,
	getProductStart,
	getProductSuccess,
	selectUserDetails,
	selectUserDetailsStatusCode,
	setUserData,
} from "../../redux/features/auth/userDetailsSlice";

const NavTop: React.FC = ({}) => {
	const dispatch = useDispatch();
	const [searchbtniconState, setSearchbtniconState] = useState<boolean>(false);
	const [showSearchBox, setShowsearchBox] = useState<boolean>(false);
	const pathname = usePathname();
	const [query, setQuery] = useState("");
	const { searchProducts } = useSearch();
	const router = useRouter();

	// Custom data selectors
	const totalQuantity = useSelector(selectTotalQuantity);
	const selectedLanguage = useSelector(languageSelector);
	const isFloatCartOpen = useSelector(floatingCartOpen);
	const isCartOpen = useSelector(cartOpen);
	const isSidebarOpen = useSelector(sidebarOpen);
	const errorMessage = "Error";

	// Search functionality
	const handleSearch = async () => {
		await searchProducts(query);
		router.push(`/search-result?search=${query}`);
	};

	const handleSubmit = () => {
		handleSearch();
	};

	// Using the custom hook to set enter key to submit search action
	useEnterKey(handleSubmit, "searchInput");

	function searchboxhandleClick(event: React.MouseEvent<HTMLButtonElement>) {
		setSearchbtniconState((searchbtnState) => !searchbtnState);
		setShowsearchBox(!showSearchBox);
	}

	let toggleSearchicon: string | null = searchbtniconState ? "active" : null;

	//Scroll prevention according sidebar state
	useEffect(() => {
		if (isSidebarOpen) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [isSidebarOpen]);

	// Close sidebar when url gets reloaded
	useEffect(() => {
		dispatch(closeSidebar());
	}, [dispatch]);

	// Toggle sidebar
	const handleToggleSidebar = () => {
		dispatch(toggleSidebar());
	};

	// Close sidebar
	const handleCloseSidebar = () => {
		dispatch(closeSidebar());
	};

	// Toggle cartslider
	const handleToggleCart = () => {
		dispatch(toggleCart());
	};

	// Close cartslider
	const handleCloseCart = () => {
		dispatch(closeCart());
	};

	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);

	useEffect(() => {
		disableCopy();
	}, []);

	// Decode user token from localStorage
	const decoded = getUserInfo() as any;
	const userId = decoded?.id;

	// Fetch user info data
	useEffect(() => {
		const fetchUserDetails = async () => {
			const token = localStorage.getItem("accessToken") || "";
			dispatch(getProductStart());
			try {
				const productData = await fetchUserDetailsById(userId, token);
				dispatch(getProductSuccess(productData));
				dispatch(setUserData(productData));
			} catch (error: any) {
				dispatch(getProductFailure(error));
			}
		};
		fetchUserDetails();

		return () => {};
	}, [dispatch, userId]);

	// For multi-language
	const t = useTranslations("searchBox");

	// User data selector
	const userDatastatus = useSelector(selectUserDetailsStatusCode);
	const userData = useSelector(selectUserDetails);

	return (
		<div>
			<div className="relative">
				<div
					onClick={handleCloseSidebar}
					className={`w-full h-screen smooth-animation-mid cursor-pointer z-50 bg-overlayBg ${
						isSidebarOpen
							? "bg-opacity-30 fixed top-0 left-0 translate-x-0"
							: "bg-opacity-0 fixed top-0 -left-full -translate-x-full"
					} `}
				></div>
				<div className="relative w-full">
					<div
						className={`w-[85%] md:w-[60%] smooth-animation-high z-50  ${
							isSidebarOpen
								? "translate-x-0 fixed top-0 left-0"
								: "-translate-x-full fixed top-0 -left-full"
						}`}
					>
						<MobileSidebar />
					</div>
				</div>
			</div>

			<div className="relative">
				<div onClick={handleCloseCart}>
					<div
						className={`h-screen w-full smooth-animation-mid z-40 cursor-pointer bg-transparent ${
							isCartOpen
								? "fixed top-0 right-0 translate-x-0"
								: "fixed top-0 -right-full translate-x-full"
						}`}
					></div>
				</div>

				<div className="relative">
					<div
						className={`w-full smooth-animation-high z-40  ${
							isCartOpen
								? "translate-x-0 fixed top-0 right-0"
								: "translate-x-full fixed top-0 -right-full"
						}`}
					>
						<CartSlider />
					</div>
				</div>
			</div>

			<div className="ct-flex-between bg-white p-4 lg:hidden relative z-10 shadow-md">
				<div className="relative">
					<button onClick={handleToggleSidebar}>
						<SlMenu className="text-xl" />
					</button>
				</div>

				<div ref={imageRef}>
					<Link href={`/`}>
						<Image
							src="/image/brand/honeyraj.png"
							width={100}
							height={50}
							alt="Brand Logo"
							priority={true}
							onDragStart={(e) => e.preventDefault()}
						/>
					</Link>
				</div>

				<button
					onClick={searchboxhandleClick}
					className={`${toggleSearchicon ? "hidden" : "active"}`}
				>
					<CiSearch className="text-2xl" />
				</button>

				<button
					onClick={searchboxhandleClick}
					className={`${toggleSearchicon ? "active" : "hidden"}`}
				>
					<RxCross2 className="text-2xl" />
				</button>
			</div>

			{/* large screen nav top */}

			<div className="hidden lg:ct-container lg:ct-flex-between lg:gap-x-2 pt-3">
				<Link href={`/`}>
					<div ref={imageRef}>
						<Image
							src="/image/brand/honeyraj.png"
							alt=""
							width={180}
							height={200}
							priority={true}
							onDragStart={(e) => e.preventDefault()}
						/>
					</div>
				</Link>
				<div>
					<div className="xl:w-[656px] lg:w-[540px] lg:flex hidden relative">
						<input
							type="search"
							id="searchInput"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="appearance-none w-full p-3 pl-16 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:placeholder-gray-400 dark:text-black focus:outline-none placeholder:capitalize"
							placeholder={t("search-placeholder")}
						/>
						<button
							onClick={handleSubmit}
							className=" absolute left-6 top-3 cursor-pointer"
						>
							<CiSearch className="text-2xl" />
						</button>
					</div>
				</div>

				<div className="ct-flex-between space-x-6">
					<div>
						<div className=" cursor-pointer">
							<LanguageDropdown
								textColor="black"
								borderColor="black"
								bgColor="white"
								dropdownopenColor="black"
							/>
						</div>
					</div>
					<div>
						<button className="flex cursor-pointer" onClick={handleToggleCart}>
							<FiShoppingCart className="text-2xl" />
							<span>({totalQuantity})</span>
						</button>
					</div>
					<UserAccountDropdown />
				</div>
			</div>

			{/* searchbox */}

			<div className="">
				<div
					className={`smooth-animation-high ${
						showSearchBox
							? "translate-y-0 h-full"
							: "-translate-y-full h-0 opacity-0 pointer-events-none"
					}`}
				>
					<SearchBox />
				</div>
			</div>
			{/* Floating Cart */}
			<div
				className={`smooth-animation absolute ${
					isFloatCartOpen && pathname !== `/checkout`
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
			>
				<FloatingCart />
			</div>
		</div>
	);
};

export default NavTop;
