import React from "react";
import { FaGoogle, FaSquareFacebook } from "react-icons/fa6";
import CustomButton from "../../util/CustomButton";

const SocialLogin = () => {
	return (
		<div className="ct-flex-center space-x-2">
			<button className="w-full ct-flex-center ct-flex-center space-x-2 inner-border inner-border-[#F68821] py-3 rounded capitalize font-medium text-[#F68821] cursor-pointer">
				<FaGoogle />
				<CustomButton buttonText="Google" />
			</button>
			<button className="w-full ct-flex-center space-x-2 inner-border inner-border-[#F68821] py-3 rounded capitalize font-medium text-[#F68821] cursor-pointer">
				<FaSquareFacebook />
				<CustomButton buttonText="Facebook" />
			</button>
		</div>
	);
};

export default SocialLogin;
