import React from "react";
import HeroSlider from "../hero/HeroSlider";
import HeroBannar from "../hero/HeroBannar";

const HeroSection: React.FC = () => {
	return (
		<div className="ct-container lg:ct-grid-cols-3 my-2 lg:mt-0">
			<div className="w-full lg:w-[98%] lg:col-span-2 cursor-pointer">
				<HeroSlider />
			</div>

			<div className="w-full relative">
				<HeroBannar />
			</div>
		</div>
	);
};

export default HeroSection;
