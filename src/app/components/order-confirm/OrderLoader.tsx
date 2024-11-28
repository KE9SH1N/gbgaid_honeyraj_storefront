import React from "react";

const OrderLoader = () => {
	return (
		<div className="ct-container w-full">
			<div className="w-full ct-flex-center flex-col animate-pulse">
				<div className="text-9xl text-gbActiveColor bg-gbActiveColor rounded-full h-32 w-32"></div>
				<div className="text-center space-y-6 my-4 w-[70%]">
					<div className="bg-gray-300 h-8 w-[70%] mx-auto rounded"></div>
					<div className="flex justify-center items-center w-full">
						<div className="bg-gray-300 h-8 w-[60%] mx-auto rounded"></div>
						<div className="bg-gbPrimaryColor h-8 w-[40%] ml-2 rounded"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderLoader;
