import React from "react";
import { ImFilesEmpty } from "react-icons/im";

const EmptyOrderListTable = () => {
	return (
		<div className="h-[20vh] flex items-center flex-col text-gray-400 gap-y-4 justify-center">
			<p>
				<ImFilesEmpty className="text-2xl" />
			</p>
			<span className=" capitalize">No Data Found</span>
		</div>
	);
};

export default EmptyOrderListTable;
