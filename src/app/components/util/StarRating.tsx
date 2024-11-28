import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = () => {
	return (
		<div className="ct-flex-center text-gbPrimaryColor gap-x-1">
			<FaStar />
			<FaStar />
			<FaStar />
			<FaStar />
			<FaStarHalfAlt />
		</div>
	);
};

export default StarRating;
