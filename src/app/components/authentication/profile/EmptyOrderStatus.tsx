import React from "react";
import { ImFilesEmpty } from "react-icons/im";

const EmptyOrderStatus = () => {
	return (
		<div className="h-[60vh] flex items-center flex-col text-gray-400 gap-y-4 justify-center">
			<p>
				<ImFilesEmpty className="text-8xl" />
			</p>
			<span className=" capitalize text-3xl">No Data Found</span>
		</div>
	);
};

export default EmptyOrderStatus;
