import Image from "next/image";
import React, { useRef } from "react";
import CustomButton from "../util/CustomButton";
import { useBlockRightClick } from "../../lib/common/BlockRightClick";
import { useTranslations } from "next-intl";

const ComboTogether = () => {
	// Block Right Click
	const imageRef = useRef<HTMLDivElement>(null);
	useBlockRightClick(imageRef);
	// For multi-language
	const t = useTranslations("comboTogether");
	return (
		<div>
			<div className="mt-4 md:my-0">
				<h1 className=" text-xl font-semibold capitalize">{t("title")}</h1>
				<div
					ref={imageRef}
					className="border border-gbPrimaryColor ct-flex-start items-center flex-col md:flex-row gap-x-24 rounded mt-4 relative overflow-hidden"
				>
					<ul className="ct-flex-start gap-x-4 py-3 px-4">
						<li>
							<Image
								src="/image/combo/combo1.svg"
								alt=""
								width={100}
								height={100}
								onDragStart={(e) => e.preventDefault()}
							/>
						</li>
						<li>
							<Image
								src="/image/combo/combo2.svg"
								alt=""
								width={100}
								height={100}
								onDragStart={(e) => e.preventDefault()}
							/>
						</li>
						<li>
							<Image
								src="/image/combo/combo3.svg"
								alt=""
								width={100}
								height={100}
								onDragStart={(e) => e.preventDefault()}
							/>
						</li>
					</ul>
					<div className="bg-[#FFF9F3] absolute -top-[20%] -right-[30%] md:-top-[45%] md:-right-[3%] w-72 h-72 md:w-60 md:h-60 -z-10 rounded-full"></div>
					<div className="my-4 md:my-0 w-full md:w-[20%] ct-flex-center flex-col">
						<p className=" capitalize text-center font-semibold">
							{t("combo-text")} ৳<span>25.00</span>
						</p>
						<div className="bg-gbPrimaryColor py-2 text-xs md:w-full w-[50%] text-center rounded capitalize text-white mt-2 cursor-pointer">
							<CustomButton buttonText={t("combo-button")} />
						</div>
					</div>
				</div>
				<div className=""></div>
			</div>
		</div>
	);
};

export default ComboTogether;
