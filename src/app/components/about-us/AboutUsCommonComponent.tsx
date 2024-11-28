import React from "react";
import { aboutUsBody } from "../../../data/aboutUs";
import { aboutUsData } from "../../types/aboutUsDataType";

const AboutUsCommonComponent = () => {
	return (
		<div className="ct-flex-start flex-col gap-y-20 lg:gap-y-40">
			{aboutUsBody.map((element: aboutUsData, index: number) => (
				<div
					key={element.id}
					className="w-full ct-flex-center flex-col lg:flex-row items-center lg:items-start lg:ct-flex-between gap-y-5"
				>
					<h2 className="w-full lg:w-[25%] font-semibold text-3xl text-center lg:text-start leading-9">
						{element.title}
					</h2>
					<div className="w-full lg:w-[60%] ct-flex-start flex-col gap-y-12 px-3 lg:px-0">
						<p className=" font-medium text-xl lg:text-2xl leading-7 text-[#9E9E9E]">
							{element?.description?.paragraphOne}
						</p>
						<p className=" font-medium text-xl lg:text-2xl leading-7 text-[#9E9E9E]">
							{element?.description?.paragraphOne}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default AboutUsCommonComponent;
