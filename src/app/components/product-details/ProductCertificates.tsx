import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { selectProductDetailsData } from "../../redux/features/product/productdetailsSlice";

const ProductCertificates = () => {
	// Product details Selector
	const productDetailsData = useSelector(selectProductDetailsData);
	return (
		<div className=" ct-flex-start flex-col space-y-4">
			{JSON.parse(productDetailsData?.certification_en).map((item: any) => {
				return <div key={item.id}>{item}</div>;
			})}
		</div>
	);
};

export default ProductCertificates;
