"use client";
import React, { useState } from "react";
import {
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const questions = [
	{
		question: "Forem ipsum dolor sit amet, consectetur adipiscing elit?",
		answer:
			"Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.",
	},
	{
		question: "Forem ipsum dolor sit amet, consectetur adipiscing elit?",
		answer:
			"Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.",
	},
	{
		question: "Forem ipsum dolor sit amet, consectetur adipiscing elit?",
		answer:
			"Korem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis. Ut commodo efficitur neque.",
	},
];

const BillingFaq = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};
	return (
		<div className="mb-12 ct-container">
			<div className="ct-flex-between lg:items-start flex-col lg:flex-row space-y-6 lg:space-x-12">
				<div className="w-full lg:w-[40%] capitalize flex flex-col space-y-3">
					<h2 className=" text-3xl font-semibold">billing FAQs</h2>
					<p className="text-[#767676]">
						Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
						vulputate libero et velit interdum, ac aliquet odio mattis.
					</p>
				</div>
				<div className="w-full lg:w-[60%]">
					<ul className="w-full ct-flex-start flex-col space-y-8">
						{questions.map((item, index) => (
							<li className="w-full" key={index}>
								<div
									className="ct-flex-start lg:space-x-4 space-y-4 cursor-pointer"
									onClick={() => toggleAccordion(index)}
								>
									<p className="w-full text-[#9E9E9E]">{item.question}</p>
									{openIndex === index ? (
										<MdOutlineKeyboardArrowUp className="text-2xl" />
									) : (
										<MdOutlineKeyboardArrowDown className="text-2xl" />
									)}
								</div>
								<div
									className={`w-full border-t border-borderLine mt-4 ${
										openIndex === index ? "block" : "hidden"
									}`}
								>
									<p className="my-4">{item.answer}</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default BillingFaq;
