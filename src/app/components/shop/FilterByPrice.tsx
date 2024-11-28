"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setMinPrice,
	setMaxPrice,
	selectMinPrice,
	selectMaxPrice,
	setFilteredProducts,
} from "../../redux/features/product/filterSlice";
import { Product } from "../../types/productType";
import { useTranslations } from "next-intl";
import { selectAllProducts } from "../../redux/features/product/allDataSlice";

const FilterByPrice = () => {
	const dispatch = useDispatch();
	const products = useSelector(selectAllProducts);
	const minPrice = useSelector(selectMinPrice);
	const maxPrice = useSelector(selectMaxPrice);

	const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setMinPrice(parseInt(e.target.value)));
	};

	const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setMaxPrice(parseInt(e.target.value)));
	};
	useEffect(() => {
		if (minPrice < 0) dispatch(setMinPrice(0));
		if (maxPrice > 10000) dispatch(setMaxPrice(10000));
		if (minPrice > maxPrice) dispatch(setMinPrice(maxPrice));
		if (maxPrice < minPrice) dispatch(setMaxPrice(minPrice));
	}, [minPrice, maxPrice, dispatch]);

	useEffect(() => {
		const filteredProducts = products.filter(
			(product: Product) =>
				(product.regular_prices >= minPrice &&
					product.regular_prices <= maxPrice) ||
				(product.current_prices >= minPrice &&
					product.current_prices <= maxPrice)
		);
		// Dispatch action to update filtered products
		dispatch(setFilteredProducts(filteredProducts));
	}, [minPrice, maxPrice, dispatch, products]);

	// For multi-language
	const t = useTranslations("filter");

	return (
		<div className="py-3">
			<h4 className="capitalize font-semibold mb-4">{t("price-filter")}</h4>
			<div
				className="slider"
				style={{
					height: "5px",
					position: "relative",
					background: "#ddd",
					borderRadius: "5px",
				}}
			>
				<div
					style={{
						width: `${((maxPrice - minPrice) / 10000) * 100}%`,
						left: `${(minPrice / 10000) * 100}%`,
						height: "100%",
						position: "absolute",
						borderRadius: "5px",
						background: "#f68821",
					}}
				></div>
			</div>
			<div className="range-input">
				<input
					type="range"
					className="range-min"
					min="0"
					max="10000"
					value={minPrice}
					onChange={handleMinPriceChange}
					step="10"
				/>
				<input
					type="range"
					className="range-max"
					min="0"
					max="10000"
					value={maxPrice}
					onChange={handleMaxPriceChange}
					step="10"
				/>
			</div>
			<div className="ct-flex-between my-3">
				<p>
					৳ <span>{minPrice}</span>
				</p>
				<p>
					৳ <span>{maxPrice}</span>
				</p>
			</div>
		</div>
	);
};

export default FilterByPrice;
