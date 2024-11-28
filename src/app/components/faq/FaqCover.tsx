import Image from "next/image";
import React from "react";

const FaqCover = () => {
	return (
		<div className="ct-container">
			<div className=" relative">
				<Image
					src="/image/faq/faq.png"
					alt=""
					width={1440}
					height={417}
					layout="responsive"
				/>

				<div className="absolute inset-0 flex items-center justify-center flex-col capitalize">
					<h2 className="text-white text-2xl font-bold ">FAQ</h2>
					<p className=" text-2xl text-[#7E7E7E]">Frequently ask question ?</p>
				</div>
			</div>
		</div>
	);
};

export default FaqCover;
