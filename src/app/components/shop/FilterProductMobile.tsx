import React from "react";
import FilterByCategoryMobile from "./FilterByCategoryMobile";
import FilterByStockMobile from "./FilterByStockMobile";

const FilterProductMobile = () => {
	return (
		<div className="ct-flex-between">
			<FilterByCategoryMobile />
			<FilterByStockMobile />
		</div>
	);
};

export default FilterProductMobile;
