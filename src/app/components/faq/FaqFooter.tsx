import Image from "next/image";
import React from "react";
import CustomButton from "../util/CustomButton";

const FaqFooter = () => {
	return (
		<div className="bg-[#2E2E2E] mt-24">
			<div className="ct-flex-center lg:space-x-5">
				<div className="py-6 px-3 lg:px-12 text-[#FFFFFF]">
					<h2 className=" capitalize text-3xl font-semibold">
						Still have a question?
					</h2>
					<p className=" capitalize">
						Porem ipsum dolor sit amet, consectetur adipiscing elit.
					</p>
					<div className="w-full ct-flex-start space-x-4 mt-6">
						<div className="ct-flex-center w-[50%] lg:w-[25%] bg-gbPrimaryColor py-3 rounded capitalize text-xs text-white cursor-pointer">
							<CustomButton buttonText="make a call" />
						</div>
						<div className="ct-flex-center w-[50%] lg:w-[25%] inner-border inner-border-gbPrimaryColor py-3 rounded capitalize text-xs font-medium text-gbPrimaryColor cursor-pointer">
							<CustomButton buttonText="learn more" />
						</div>
					</div>
				</div>
				<div className="pt-14 hidden lg:flex">
					<Image
						src="/image/faq/faq-footer.png"
						alt="faq footer"
						width={168}
						height={106}
						layout="responsive"
					/>
				</div>
			</div>
		</div>
	);
};

export default FaqFooter;
