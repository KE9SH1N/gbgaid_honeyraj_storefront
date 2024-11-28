"use client";
import { useTranslations } from "next-intl";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import Image from "next/image";
import React, { useRef } from "react";

const ClientAvater = () => {
	// For multi-language
	const t = useTranslations("siteRating");
	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);

	return (
		<div className="mt-16">
			<div className="text-center">
				<p className=" text-lg font-medium capitalize">
					{t("trust-text-1")}{" "}
					<strong className="text-gbPrimaryColor">{t("trust-text-2")} </strong>
					{t("trust-text-3")}
				</p>
			</div>
			<div ref={imageRef} className="w-full lg:ct-flex-center my-6">
				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor">
					<Image
						src="/image/avater-1.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>

				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-2.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>
				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-7.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>
				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-4.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>

				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-5.jpg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>

				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-6.jpg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>

				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-8.jpg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>

				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-1.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>

				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-2.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>
				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-7.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>
				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-4.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>

				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-8.jpg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>
				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-4.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>

				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-8.jpg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>

				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-2.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>
				<div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-gbAvaterBorderColor ">
					<Image
						src="/image/avater-7.jpeg"
						alt=""
						width={100}
						height={100}
						onDragStart={(e) => e.preventDefault()}
					/>
				</div>
			</div>
		</div>
	);
};

export default ClientAvater;
