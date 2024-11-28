import React from "react";

import UserDashboard from "../../../components/authentication/profile/UserDashboard";
import GlobalLayout from "@/app/global-layout/GlobalLayout";
import FooterMain from "@/app/components/footer/FooterMain";

const page = () => {
	return (
		<div>
			<GlobalLayout>
				<UserDashboard />
				<FooterMain />
			</GlobalLayout>
		</div>
	);
};

export default page;
