import React from "react";
import GlobalLayout from "../../../global-layout/GlobalLayout";
import RegistrationAccount from "../../../components/authentication/registration/RegistrationAccount";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<div className="ct-container">
					<RegistrationAccount />
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
