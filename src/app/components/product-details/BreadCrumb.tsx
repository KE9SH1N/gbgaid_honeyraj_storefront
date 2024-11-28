"use client";
import { useTranslations } from "next-intl";
import { fetchProductDetailsById } from "../../api/productDetailsApiService";
import {
	getProductFailure,
	getProductStart,
	getProductSuccess,
	selectProductDetailsData,
	setProductData,
} from "../../redux/features/product/productdetailsSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";
import BreadCrumbLoader from "./loader/BreadCrumbLoader";

const BreadCrumb = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const productSlug = params.id[0];
	const productData = useSelector(selectProductDetailsData);
	const errorMessage = "Error";
	// For multi-language
	const t = useTranslations("path");

	const selectedLanguage = useSelector(languageSelector);

	useEffect(() => {
		const fetchProduct = async () => {
			dispatch(getProductStart());
			try {
				const productData = await fetchProductDetailsById(productSlug);
				dispatch(getProductSuccess(productData));
				dispatch(setProductData(productData));
			} catch (error) {
				dispatch(getProductFailure(errorMessage));
			}
		};
		fetchProduct();

		return () => {};
	}, [dispatch, productSlug]);

	if (!productData) {
		return (
			<div className="ct-container">
				<BreadCrumbLoader />
			</div>
		);
	}

	return (
		<nav className="ct-container my-5">
			<ol className="ct-flex-start">
				<li className=" ct-flex-start items-center text-xs sm:text-sm">
					<Link href={`/`} className="capitalize">
						{t("home")}
					</Link>
				</li>
				<li className=" ct-flex-start items-center text-xs sm:text-sm">
					<p>
						<span>
							<MdOutlineKeyboardArrowRight className="text-xl" />
						</span>
					</p>
					<Link href={`/products`} className="capitalize">
						{t("products")}
					</Link>
				</li>
				<li className=" ct-flex-start items-center text-xs sm:text-sm">
					<p>
						<span>
							<MdOutlineKeyboardArrowRight className="text-xl" />
						</span>
					</p>

					<Link
						href={`/products/${productSlug}`}
						className="pb-[1px] capitalize"
					>
						{productData.product_slug === productSlug &&
						selectedLanguage === "bn"
							? productData?.product_title_bn
							: productData?.product_title_en}
					</Link>
				</li>
			</ol>
		</nav>
	);
};

export default BreadCrumb;
