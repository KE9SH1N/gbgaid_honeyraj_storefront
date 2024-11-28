import React from "react";

const ConditionsForProductReturnAcceptance = () => {
	return (
		<div className="ct-container w-full">
			<h2 className="font-semibold text-5xl leading-[58px]">
				Conditions for Product Return Acceptance
			</h2>
			<p className="text-[#A8A8A8] text-2xl font-medium leading-7 mt-8">
				For a return to be accepted
			</p>
			<div className="mt-4">
				<ul className=" list-disc ml-5 ct-flex-start flex-col gap-y-2">
					<li>
						The product must be in its original packaging with all labels,
						seals, and tags intact.
					</li>
					<li>It must be unused (unless it arrived damaged or defective).</li>
				</ul>
			</div>
		</div>
	);
};

export default ConditionsForProductReturnAcceptance;
