import React from "react";
import GlobalLayout from "../../../global-layout/GlobalLayout";
import RequestPasswordChange from "../../../components/authentication/forget-password/RequestPasswordChange";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<div className="ct-flex-center min-h-[60vh]">
					<RequestPasswordChange />
				</div>
			</GlobalLayout>
		</div>
	);
};

export default page;
