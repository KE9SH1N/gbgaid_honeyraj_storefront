"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import { useTranslations } from "next-intl";

const BrandService: React.FC = () => {
	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);
	// For multi-language
	const t = useTranslations("brandService");
	return (
		<div className=" bg-componentBg">
			<div
				ref={imageRef}
				className=" py-3 ct-flex-center lg:ct-flex-between flex-col lg:flex-row"
			>
				<div className="ct-flex-center flex-row w-full space-x-4 py-4">
					<div className="w-100%">
						<Image
							src="/image/Payment Information.svg"
							alt="image 1"
							width={70}
							height={70}
							onDragStart={(e) => e.preventDefault()}
						/>
					</div>
					<div>
						<h3 className=" text-sm capitalize font-semibold">
							{t("safe-transaction.title")}
						</h3>
						<p className="text-xs xl:w-80 w-60 capitalize">
							{t("safe-transaction.des")}
						</p>
					</div>
				</div>

				<div className="ct-flex-center  flex-row w-full space-x-4 py-4">
					<div className="w-100%">
						<Image
							src="/image/Mask group.svg"
							alt="image 1"
							width={70}
							height={70}
							onDragStart={(e) => e.preventDefault()}
						/>
					</div>
					<div className="w-100%">
						<h3 className=" text-sm capitalize font-semibold">
							{t("green-delivered.title")}
						</h3>
						<p className="text-xs xl:w-80 w-60  capitalize">
							{t("green-delivered.des")}
						</p>
					</div>
				</div>

				<div className="ct-flex-center  flex-row w-full space-x-4 py-4">
					<div>
						<Image
							src="/image/Environment.svg"
							alt="image 1"
							width={70}
							height={70}
							onDragStart={(e) => e.preventDefault()}
						/>
					</div>
					<div>
						<h3 className=" text-sm capitalize font-semibold">
							{t("natural.title")}
						</h3>
						<p className="text-xs xl:w-80 w-60  capitalize">
							{t("natural.des")}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BrandService;
