"use client";
import React, { useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import { useSelector } from "react-redux";
import { languageSelector } from "../../redux/features/intl/languageSlice";

interface AccordionItem {
	title_en: string;
	title_bn: string;
	description_bn: string;
	description_en: string;
}

interface AccordionProps {
	items: AccordionItem[];
}

const SubHealthBenifits: React.FC<AccordionProps> = ({ items }) => {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	const toggleAccordion = (index: number) => {
		if (openIndex !== index) {
			setOpenIndex(index);
		}
	};
	const selectedLanguage = useSelector(languageSelector);

	return (
		<div>
			<div>
				{items?.length > 0 &&
					items?.map((item: AccordionItem, index: number) => (
						<div key={index}>
							<div
								className="my-2 lg:my-6 ct-flex-between space-x-2 border-b border-borderLine cursor-pointer w-full"
								onClick={() => toggleAccordion(index)}
							>
								<h4 className=" font-semibold text-sm md:text-base text-justify pb-4 capitalize w-[80%]">
									{selectedLanguage === "bn" ? item?.title_bn : item?.title_en}
								</h4>
								<div className=" w-[10%] pr-2 flex justify-end items-end pb-4">
									<IoMdArrowDropup
										className={`text-xl smooth-animation-mid ${
											openIndex === 0 ? "rotate-180" : ""
										}`}
									/>
								</div>
							</div>
							<div>
								<p
									className={`text-[#0B0B0B] text-justify overflow-hidden smooth-animation-mid ${
										openIndex === index ? "block" : "hidden"
									}`}
								>
									{selectedLanguage === "bn" ? (
										<div
											className="ql-editor"
											dangerouslySetInnerHTML={{
												__html: item?.description_bn,
											}}
										/>
									) : (
										<div
											className="ql-editor"
											dangerouslySetInnerHTML={{
												__html: item?.description_en,
											}}
										/>
									)}
								</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default SubHealthBenifits;
