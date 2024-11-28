"use client";
import React, { useEffect } from "react";
import SubHealthBenifits from "./SubHealthBenifits";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

import {
	getProductFailure,
	getProductStart,
	getProductSuccess,
	selectProductDetailsData,
	setProductData,
} from "../../redux/features/product/productdetailsSlice";
import { useParams } from "next/navigation";
import { fetchProductDetailsById } from "../../api/productDetailsApiService";

const HealthBenifits = () => {
	// For multi-language
	const t = useTranslations("sectionHead");

	const dispatch = useDispatch();
	const params = useParams();
	const productSlug = params.id[0];
	const errorMessage = "Error";
	const productData = useSelector(selectProductDetailsData);

	const productDetailsHealthBenifits = useSelector(
		(state: any) => state?.productdetails?.product?.health_benefits
	);

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

	return (
		<div className="w-full">
			{productDetailsHealthBenifits?.length > 0 && (
				<div>
					<div className="mt-3 lg:mt-10 px-5 lg:px-6">
						<SubHealthBenifits items={productDetailsHealthBenifits} />
					</div>
				</div>
			)}
		</div>
	);
};

export default HealthBenifits;
