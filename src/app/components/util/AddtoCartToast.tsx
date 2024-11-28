import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const AddtoCartToast = () => {
	return (
		<div className="ct-container relative">
			<div className=" w-[368px] rounded-[10px] capitalize absolute inset-0 z-50 mx-auto shadow-2xl">
				<div className="border-[#acd6b0] border bg-[#c3ffc9] relative text-black py-3 px-6 rounded flex items-center justify-center gap-1">
					<FaRegCircleCheck className="text-[#22904c]" />
					<span>your items successfully added to cart</span>
				</div>
			</div>
		</div>
	);
};

export default AddtoCartToast;
