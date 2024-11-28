import React from "react";

const ContactUsInfo = () => {
	return (
		<div className="w-full">
			<h1 className=" font-semibold text-2xl capitalize">Contact us</h1>
			<p className="py-4 text-xl leading-6">
				Office Address: House-00, Road-00, Block-A, Banasree, Rampura, Dhaka
			</p>
			<div>
				<p>ghorerbaza.gb@gmail.com</p>
				<p>+8809642922922</p>
			</div>

			<div className="w-full mt-10">
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7303.043258309038!2d90.42941489999998!3d23.764432399999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b903b516ffb7%3A0xfd0bc5c43250ca2d!2sRampura%2Cbanasree!5e0!3m2!1sen!2sbd!4v1727772105202!5m2!1sen!2sbd"
					width="600"
					height="350"
					className="w-full"
					style={{ border: 0 }}
					allowFullScreen
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	);
};

export default ContactUsInfo;
