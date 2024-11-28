import Image from "next/image";
import React from "react";

const AboutCover = () => {
	return (
		<div className="ct-container">
			<div className=" relative">
				<Image
					src="/image/about-us/cover/about-cover.png"
					alt=""
					width={1440}
					height={417}
					layout="responsive"
				/>

				<div className="absolute inset-0 flex items-center justify-center">
					<h2 className="text-white text-2xl font-bold capitalize">About Us</h2>
				</div>
			</div>
		</div>
	);
};

export default AboutCover;
