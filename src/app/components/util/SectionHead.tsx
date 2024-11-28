import React from "react";

interface sectionheadingText {
	headingText: string;
}

const SectionHead: React.FC<sectionheadingText> = ({ headingText }) => {
	return (
		<div className="text-center md:text-start pt-6">
			<div className="border-b border-borderLine">
				<h3 className=" text-2xl font-semibold  uppercase pb-4">
					{headingText}
				</h3>
			</div>
		</div>
	);
};

export default SectionHead;
