"use client";
import React from "react";

const PreLoader = () => {
	return (
		<div className="animate-pulse">
			<div className="bg-gray-100 py-2 hidden lg:block">
				{/* Header */}
				<div className="ct-container  animate-pulse px-4 lg:px-0 py-4">
					<div className="flex justify-between items-center">
						{/* Logo Placeholder */}
						<div className="flex items-center">
							<div className="h-10 w-32 bg-gray-400 rounded"></div>
						</div>

						{/* Search Bar Placeholder */}
						<div className="flex items-center w-full mx-8">
							<div className="h-10 w-full bg-gray-400 rounded"></div>
						</div>

						{/* Right Section Placeholders */}
						<div className="flex space-x-4 items-center">
							<div className="h-6 w-6 bg-gray-400 rounded-full"></div>

							<div className="h-6 w-12 bg-gray-400 rounded"></div>

							<div className="h-6 w-6 bg-gray-400 rounded"></div>

							<div className="h-6 w-12 bg-gray-400 rounded"></div>
						</div>
					</div>

					{/* Navigation Links Placeholder */}
					<div className=" ct-flex-between gap-x-4">
						<div className="mt-4 w-full ct-flex-center lg:ct-flex-between lg:gap-x-0 gap-x-3">
							{Array.from({ length: 5 }).map((_, index) => (
								<div
									key={index}
									className="h-6 w-16 lg:w-24 bg-gray-400 rounded"
								></div>
							))}
						</div>
						<div className="lg:mt-4 lg:flex lg:justify-around lg:items-center lg:gap-x-3 hidden">
							{Array.from({ length: 2 }).map((_, index) => (
								<div key={index} className="h-6 w-40 bg-gray-400 rounded"></div>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="bg-gray-100 py-3 flex lg:hidden w-full px-4">
				<div className="w-full ct-flex-between ">
					<div className="h-10 w-[10%] bg-gray-400 rounded"></div>
					<div className="h-10 w-[30%] bg-gray-400 rounded"></div>
					<div className="ct-flex-start w-[20%] gap-x-5">
						<div className="h-6 w-6 bg-gray-400 rounded"></div>
						<div className="h-6 w-12 bg-gray-400 rounded"></div>
					</div>
				</div>
			</div>

			<div className="ct-container px-4 lg:px-0">
				{/* Main Banner */}
				<div className="w-full ct-flex-between my-4">
					<div className="lg:h-80 h-64 w-full lg:w-[65%] bg-gray-400 rounded mb-6"></div>
					<div className="hidden w-full lg:flex h-80 lg:w-[30%] bg-gray-300 rounded mb-6"></div>
				</div>

				<div className="ct-grid-cols-5 xl:ct-grid-cols-10 animate-pulse">
					{Array.from({ length: 10 }).map((_, index) => (
						<div key={index} className="border border-transparent">
							<div className="my-2 justify-center flex ">
								<div className="bg-gray-400 w-16 h-16 rounded" />
							</div>
							<div className="overflow-hidden">
								<h3 className="font-semibold text-sm text-center bg-gray-400 h-4 w-full mx-auto rounded" />
							</div>
						</div>
					))}
				</div>

				{/* Product Grid */}
				<div className="my-12">
					<div>
						<div className="text-center md:text-start pt-6 animate-pulse">
							<div className="border-b border-borderLine">
								<div className="bg-gray-400 h-8 w-[20%] mx-auto md:mx-0 mb-4 rounded"></div>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-2 md:ct-grid-cols-3 lg:ct-grid-cols-4 xl:ct-grid-cols-5 gap-6 md:gap-4 my-6">
						{Array(10)
							.fill(null)
							.map((_, index) => (
								<div
									key={index}
									className="animate-pulse h-auto p-2 border border-gray-200 rounded shadow"
								>
									<div className="bg-gray-400 h-40 w-full rounded-md"></div>
									<div className="mt-4 space-y-2">
										<div className="bg-gray-400 h-4 w-3/4 rounded-md"></div>
										<div className="bg-gray-400 h-4 w-1/2 rounded-md"></div>
									</div>
									<div className="flex justify-between items-center py-2">
										<div className="bg-gray-400 h-4 w-1/4 rounded-md"></div>
										<div className="bg-gray-400 h-4 w-1/4 rounded-md"></div>
									</div>
									<div className="space-y-2">
										<div className="bg-gray-400 h-8 w-full rounded-md"></div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>

			<div className="bg-gray-100 py-5">
				{/* Header */}
				<div className="ct-container animate-pulse px-4 lg:px-0">
					<div className="animate-pulse lg:ct-flex-between lg:flex-row lg:gap-y-0 ct-flex-center flex-col gap-y-5">
						{/* Paragraph Lines Placeholder */}
						<div className="space-y-2 w-full lg:w-[55%]">
							<div className="h-4 bg-gray-400 rounded w-full"></div>
							<div className="h-4 bg-gray-400 rounded w-full"></div>
							<div className="h-4 bg-gray-400 rounded w-5/6"></div>
							<div className="h-4 bg-gray-400 rounded w-full"></div>
							<div className="h-4 bg-gray-400 rounded w-4/5"></div>
						</div>
						<div className="w-[40%] ct-flex-center gap-4 flex-col">
							<div className="flex justify-around items-center gap-3">
								{Array.from({ length: 3 }).map((_, index) => (
									<div
										key={index}
										className="h-6 w-24 bg-gray-400 rounded"
									></div>
								))}
							</div>
							<div className="flex justify-around items-center gap-3">
								{Array.from({ length: 2 }).map((_, index) => (
									<div
										key={index}
										className="h-6 w-40 bg-gray-400 rounded"
									></div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PreLoader;
