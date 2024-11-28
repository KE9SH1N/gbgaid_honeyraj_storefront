import React from "react";

const NonReturnableProducts = () => {
	return (
		<div className="ct-container">
			<h2 className="font-semibold text-5xl leading-[58px]">
				Non-Returnable Products
			</h2>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Perishable Items:&nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					Products like fresh fruits, vegetables, and items with short shelf
					lives cannot be returned unless damaged upon delivery.
				</span>
			</p>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Opened or Used Products:&nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					Products that have been opened, used, or tampered with cannot be
					returned unless damaged or defective upon arrival
				</span>
			</p>

			<p className=" text-2xl font-medium leading-6 mt-8">
				<span className="text-[#000000] font-semibold">
					Expired Product:&nbsp;
				</span>
				<span className="text-[#A8A8A8]">
					These products are not eligible for return unless they arrive damaged
					or defective
				</span>
			</p>
		</div>
	);
};

export default NonReturnableProducts;
