import Image from "next/image";
import React from "react";

const PolicyCover = () => {
	return (
		<div className="ct-container px-3">
			<div className=" relative">
				<Image
					src="/image/privacy/privacy-cover.png"
					alt=""
					width={1440}
					height={417}
					layout="responsive"
				/>

				<div className="absolute inset-0 flex items-center justify-center">
					<h2 className="text-white text-2xl font-bold capitalize">
						Privacy & policy
					</h2>
				</div>
			</div>
		</div>
	);
};

export default PolicyCover;
