"use client";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../../lib/helper/getBaseUrl";
import { selectProductDetailsData } from "../../redux/features/product/productdetailsSlice";

const ProductImageGallery = () => {
	// Product details selector
	const productDetailsData = useSelector(selectProductDetailsData);
	const galleryImage = productDetailsData?.product_gallery;
	const [selectedImage, setSelectedImage] = useState<string>();

	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);

	const handleImageSelect = (image: string) => {
		setSelectedImage(image);
	};

	return (
		<div ref={imageRef}>
			<div className="ct-flex-start w-full items-start gap-x-2 ">
				<div className="w-[80%] mx-auto cursor-pointer border border-borderLine">
					{!selectedImage ? (
						<Image
							src={`${getBaseUrl(true)}/${productDetailsData?.product_image}`}
							alt={productDetailsData?.product_title_en}
							width={324}
							height={324}
							onDragStart={(e) => e.preventDefault()}
							className="w-full"
						/>
					) : (
						<Image
							src={selectedImage}
							alt={productDetailsData?.product_title_en}
							width={324}
							height={324}
							onDragStart={(e) => e.preventDefault()}
						/>
					)}
				</div>
				<div className="overflow-y-auto h-[338px] scrollbar-thin scrollbar-thumb-gbCustomScrollThumbColor scrollbar-track-[#FEF3E9] scrollbar-thumb-rounded">
					<div className="ct-flex-center flex-col gap-y-2  ">
						{galleryImage?.map((itemImages: any, index: number) => (
							<div
								key={index}
								className="border border-borderLine rounded cursor-pointer"
							>
								<Image
									src={`${getBaseUrl(true)}/${itemImages}`}
									alt=""
									width={100}
									height={100}
									onClick={() =>
										handleImageSelect(`${getBaseUrl(true)}/${itemImages}`)
									}
									onDragStart={(e) => e.preventDefault()}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductImageGallery;
