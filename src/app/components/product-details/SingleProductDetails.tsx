"use client";
import React from "react";
import ProductImageGallery from "./ProductImageGallery";
import ProductDetailsInfo from "./ProductDetailsInfo";
import ProductImageSlider from "./ProductImageSlider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import {
	getProductFailure,
	getProductStart,
	getProductSuccess,
	selectProductDetailsData,
	setProductData,
} from "../../redux/features/product/productdetailsSlice";
import { fetchProductDetailsById } from "../../api/productDetailsApiService";
import ProductImageGalleryLoader from "./loader/ProductImageGalleryLoader";
import ProductImageSliderLoader from "./loader/ProductImageSliderLoader";
import ProductDetailsInfoLoader from "./loader/ProductDetailsInfoLoader";

import ProductInfoTab from "./ProductInfoTab";
import CustomerSupport from "./CustomerSupport";
import DeliveryOption from "./DeliveryOption";
import ProductInfoTabMobile from "./ProductInfoTabMobile";

const SingleProductDetails = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const productSlug = params.id[0];
	const errorMessage = "Error";

	const productData = useSelector(selectProductDetailsData);

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

	//Loading Animation
	if (!productData) {
		return (
			<div className="ct-container w-full">
				<div className="w-full ct-flex-start md:flex-row flex-col  gap-x-9">
					<div className="w-[40%] hidden md:flex">
						<ProductImageGalleryLoader />
					</div>
					<div className="w-full md:hidden">
						<ProductImageSliderLoader />
					</div>
					<div className="w-full md:w-[60%]">
						<ProductDetailsInfoLoader />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="ct-container relative">
			<div className="w-full ct-flex-start md:flex-row flex-col  gap-x-9">
				<div className="w-[40%] hidden md:flex">
					<ProductImageGallery />
				</div>
				<div className="w-full md:hidden">
					<ProductImageSlider />
				</div>
				<div className="w-full md:w-[60%]">
					<ProductDetailsInfo />
					<CustomerSupport />
					<DeliveryOption />
				</div>
			</div>

			<div className="w-full hidden lg:flex lg:flex-col my-16">
				<ProductInfoTab />
			</div>
		</div>
	);
};

export default SingleProductDetails;
