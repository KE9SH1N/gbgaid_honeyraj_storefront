import React from "react";

const BreadCrumbLoader = () => {
	return (
		<nav className=" mb-5">
			<ol className="ct-flex-start">
				<li className="ct-flex-start items-center text-xs sm:text-sm animate-pulse">
					<span className="capitalize bg-gray-300 rounded-md px-2 py-1">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</span>
				</li>
				<li className="ct-flex-start items-center text-xs sm:text-sm animate-pulse">
					<span className="mx-2">|</span>
					<span className="capitalize bg-gray-300 rounded-md px-2 py-1">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</span>
				</li>
				<li className="ct-flex-start items-center text-xs sm:text-sm animate-pulse">
					<span className="mx-2">|</span>
					<span className="capitalize bg-gray-300 rounded-md px-2 py-1">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					</span>
				</li>
			</ol>
		</nav>
	);
};

export default BreadCrumbLoader;
