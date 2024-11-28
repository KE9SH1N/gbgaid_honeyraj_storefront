"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import Link from "next/link";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";

const ShopBanner = () => {
	const selectedLanguage = useSelector(languageSelector);
	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);
	return (
		<div ref={imageRef} className="w-full">
			<Link href={`/products/deshi-maghi-shorisha-oil-5-litter`}>
				<Image
					src="/image/shop-banner.png"
					alt=""
					width={0}
					height={0}
					className="w-full"
					onDragStart={(e) => e.preventDefault()}
				/>
			</Link>
		</div>
	);
};

export default ShopBanner;
