import React from "react";
import UserLogin from "../../../components/authentication/login/UserLogin";
import GlobalLayout from "../../../global-layout/GlobalLayout";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<UserLogin />
			</GlobalLayout>
		</div>
	);
};

export default page;
