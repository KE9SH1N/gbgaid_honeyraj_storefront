"use client";
import React, { useState } from "react";
import SectionHead from "../../../util/SectionHead";
import CustomButton from "../../../util/CustomButton";
import { useTranslations } from "next-intl";

const WriteReview = () => {
	const [selected, setSelected] = useState("");

	const handleChange = (e: any) => {
		setSelected(e.target.value);
	};

	// For multi-language
	const t = useTranslations("userDashboard");
	return (
		<div className="px-2">
			<SectionHead headingText={t("writeReview.title")} />
			<div className="my-8 mb-24">
				<h2 className="text-xl font-medium my-6 capitalize">
					{t("writeReview.review.title")}
				</h2>
				<div className="ct-flex-start flex-col space-y-4">
					<div>
						<label className="inline-flex items-center cursor-pointer">
							<input
								type="radio"
								name="rating"
								value="excellent"
								checked={selected === "excellent"}
								onChange={handleChange}
								className="form-radio h-5 w-5 cursor-pointer"
							/>
							<span className="ml-2 capitalize">
								{t("writeReview.review.options.excellent")}
							</span>
						</label>
					</div>
					<div>
						<label className="inline-flex items-center cursor-pointer">
							<input
								type="radio"
								name="rating"
								value="veryGood"
								checked={selected === "veryGood"}
								onChange={handleChange}
								className="form-radio h-5 w-5 cursor-pointer"
							/>
							<span className="ml-2 capitalize">
								{t("writeReview.review.options.very-good")}
							</span>
						</label>
					</div>
					<div>
						<label className="inline-flex items-center cursor-pointer">
							<input
								type="radio"
								name="rating"
								value="good"
								checked={selected === "good"}
								onChange={handleChange}
								className="form-radio h-5 w-5 cursor-pointer"
							/>
							<span className="ml-2 capitalize">
								{t("writeReview.review.options.good")}
							</span>
						</label>
					</div>
					<div>
						<label className="inline-flex items-center cursor-pointer">
							<input
								type="radio"
								name="rating"
								value="bad"
								checked={selected === "bad"}
								onChange={handleChange}
								className="form-radio h-5 w-5 cursor-pointer"
							/>
							<span className="ml-2 capitalize">
								{t("writeReview.review.options.bad")}
							</span>
						</label>
					</div>
				</div>
				<div>
					<h2 className="text-xl font-medium my-6 capitalize">
						{t("writeReview.writeYourOpinion")}
					</h2>
					<textarea
						rows={5}
						className="w-full p-2 border border-gray-300 rounded-md focus:border-[#F68821] focus:outline-none"
						name=""
						id=""
					></textarea>
					<div className="w-full flex justify-end my-4">
						<div className="ct-flex-center bg-[#F68821] py-2 px-3 w-[25%] rounded capitalize text-white text-sm cursor-pointer">
							<CustomButton buttonText={t("writeReview.submit")} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WriteReview;
