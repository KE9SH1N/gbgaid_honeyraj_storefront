"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	selectShowAll,
	selectStockOnly,
	toggleInStockOnly,
	toggleShowAll,
} from "../../redux/features/product/filterSlice";
import { useTranslations } from "next-intl";

const FilterByStock = () => {
	const dispatch = useDispatch();
	const inStockOnly = useSelector(selectStockOnly);
	const showAll = useSelector(selectShowAll);

	const handleFilterStock = () => {
		if (!inStockOnly) {
			dispatch(toggleInStockOnly());
			dispatch(toggleShowAll());
		}
	};

	const handleFilterShowAll = () => {
		if (!showAll) {
			dispatch(toggleShowAll());
			dispatch(toggleInStockOnly());
		}
	};

	// For multi-language
	const t = useTranslations("filter");

	return (
		<div>
			<div className="py-6">
				<h4 className=" capitalize font-semibold mb-4">
					{t("stock-filter.availability")}
				</h4>
				<ul className="flex flex-col gap-y-2">
					<li>
						<label
							// htmlFor="showAll"
							className="custom-checkbox items-center cursor-pointer"
						>
							<input
								name="sshowAll"
								// id="link-checkbox"
								type="checkbox"
								checked={showAll}
								onChange={handleFilterShowAll}
							/>
							<span className="checkmark"></span>
							<span className="ml-2 text-sm capitalize">
								{t("stock-filter.show-all")}
							</span>
						</label>
					</li>
					<li>
						<label
							// htmlFor="stockOnly"
							className="custom-checkbox items-center cursor-pointer relative"
						>
							<input
								name="stockOnly"
								// id="link-checkbox"
								type="checkbox"
								checked={inStockOnly}
								onChange={handleFilterStock}
							/>
							<span className="checkmark"></span>
							<span className="ml-2 text-sm capitalize">
								{t("stock-filter.in-stock")}
							</span>
						</label>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default FilterByStock;
