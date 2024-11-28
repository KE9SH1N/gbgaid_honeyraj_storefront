import React from "react";
import ContactUsInfo from "./ContactUsInfo";
import ContactUsForm from "./ContactUsForm";

const ContactUsMain = () => {
	return (
		<div className="ct-container w-full flex-col lg:flex-row lg:ct-flex-between lg:items-start my-12">
			<div className="lg:w-[50%] my-6">
				<ContactUsInfo />
			</div>
			<div className="lg:w-[40%]">
				<ContactUsForm />
			</div>
		</div>
	);
};

export default ContactUsMain;
