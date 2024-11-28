import React from "react";

const HealthBenifitsLoader = () => {
	return (
		<div className="my-12">
			<div className="text-center md:text-start">
				<div className="animate-pulse">
					<h3 className="w-1/4 text-2xl font-semibold uppercase pb-4 py-4 bg-gray-300 rounded"></h3>
				</div>
			</div>
			<div>
				<div className="animate-pulse">
					<div className="my-6 ct-flex-between border-b border-borderLine cursor-pointer">
						<h4 className="font-semibold text-xl pb-4 capitalize bg-gray-300 rounded w-2/4"></h4>
						<div className="text-2xl bg-gray-300 rounded-full w-10 h-10"></div>
					</div>
					<div className="flex flex-col gap-y-4">
						<p className="text-[#0B0B0B] text-justify overflow-hidden smooth-animation-mid h-4 bg-gray-300 rounded"></p>
						<p className="text-[#0B0B0B] text-justify overflow-hidden smooth-animation-mid h-4 bg-gray-300 rounded"></p>
					</div>
				</div>

				<div className="animate-pulse">
					<div className="my-6 ct-flex-between border-b border-borderLine cursor-pointer">
						<h4 className="font-semibold text-xl pb-4 capitalize bg-gray-300 rounded w-2/4"></h4>
						<div className="text-2xl bg-gray-300 rounded-full w-10 h-10"></div>
					</div>
				</div>

				<div className="animate-pulse">
					<div className="my-6 ct-flex-between border-b border-borderLine cursor-pointer">
						<h4 className="font-semibold text-xl pb-4 capitalize bg-gray-300 rounded w-2/4"></h4>
						<div className="text-2xl bg-gray-300 rounded-full w-10 h-10"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HealthBenifitsLoader;
